import Header from "./components/Header"
import TodoItem from './components/TodoItem'
import Footer from './components/Footer'
import FooterExt from "./components/FooterExt"


import { useEffect, useState } from 'react'
import React from "react"


interface TodoObj {
  id: number;
  value: string;
  state: boolean
}
type InputEvent = React.ChangeEvent<HTMLInputElement>
type FormEvent = React.FormEvent<HTMLFormElement>
type filterStateType = 'all' | 'active' | 'completed'


const defaultDB: TodoObj[] = []


// Helper Functions 
function safeJsonParse(value: string | null) {
  if (value === null) {
    return defaultDB
  }
  try {
    return JSON.parse(value)
  } catch (error) {
    console.error('JSON parsing error', error)
    return defaultDB
  }
}


export default function App () {
  const [Todos, setTodos] = useState<TodoObj[]>(safeJsonParse(localStorage.getItem('mentor todo')))
  const [newTodo, setNewTodo] = useState('')
  const [filterState, setFilterState] = useState<filterStateType>('all')
  const [draggingItemIndex, setDraggingItemIndex] = useState<number>(-1)
  
  useEffect(() => {
    const todos = safeJsonParse(localStorage.getItem('mentor todo'))
    setTodos(todos)
  }, [])

  useEffect(() => {
    localStorage.setItem('mentor todo', JSON.stringify(Todos))
  }, [Todos])
  
  function handleTodoInput(event: InputEvent) {
    setNewTodo(event.target.value)
  }

  function handleFormSubmit (event: FormEvent) {
    event.preventDefault()
    const newTodos = [...Todos]
    const newId: number = newTodos.length === 0? 1: newTodos[newTodos.length - 1].id + 1
    const createdTodo: TodoObj = {
      id: newId,
      value: newTodo,
      state: false
    } 
    if (newTodo !== '') {
      newTodos.push(
        createdTodo
      )
    }
    setTodos(newTodos)
    setNewTodo('')
  }

  function handleState(id: number) {
    const newTodos = [...Todos]
    const task = newTodos.find(item => item.id === id)
    if (task) {
      task.state = !task.state
    }
    setTodos(newTodos)
  }

  function handleDeleteOneTodo (id: number) {
    const newTodos = Todos.filter(item => item.id !== id)
    setTodos(newTodos)
  }

  function handleClearCompleted () {
    setTodos(Todos.filter(item => item.state === false))
  }

  function handleFilter(filtState: filterStateType) {
    setFilterState(filtState)
  }

  function todoDisplayed(filtState: filterStateType) {
    switch (filtState) {
      case "all":
        return Todos.map(item => <TodoItem key={item.id} value={item.value} state={item.state} id={item.id} handleState={handleState} handleDeleteOneTodo={handleDeleteOneTodo} findTodoIndex={findTodoIndex} handleDragStart={handleDragStart} handleDragEnter={handleDragEnter} handleDragEnd={handleDragEnd}/>) 
        break
      case "active":
        return Todos.filter(item => item.state === false).map(item => <TodoItem key={item.id} value={item.value} state={item.state} id={item.id} handleState={handleState} handleDeleteOneTodo={handleDeleteOneTodo} findTodoIndex={findTodoIndex} handleDragStart={handleDragStart} handleDragEnter={handleDragEnter} handleDragEnd={handleDragEnd}/>)
        break
      case "completed":
        return Todos.filter(item => item.state === true).map(item => <TodoItem key={item.id} value={item.value} state={item.state} id={item.id} handleState={handleState} handleDeleteOneTodo={handleDeleteOneTodo} findTodoIndex={findTodoIndex} handleDragStart={handleDragStart} handleDragEnter={handleDragEnter} handleDragEnd={handleDragEnd}/>)
        break
    }
  }

  function handleDragStart(index: number) {
    setDraggingItemIndex(index)
  }

  function handleDragEnter(index: number) {
    const newTodos = [...Todos]
    const draggedItem = newTodos[draggingItemIndex]
    newTodos.splice(draggingItemIndex, 1)
    newTodos.splice(index, 0, draggedItem )
    setDraggingItemIndex(index)
    setTodos(newTodos)
  }

  function handleDragEnd() {
    setDraggingItemIndex(-1)
  }

  function findTodoIndex (id: number) {
    for (let i=0; i < Todos.length; i++) {
      if ( Todos[i].id === id ) return i
    }
    return -1
  }


  return (
    <main className="text-sm md:text-base lg:text-lg text-very-dark-grayish-blue min-h-[100vh] bg-bg-mobile-light md:bg-bg-desktop-light bg-no-repeat bg-top bg-[length:100%_auto] bg-very-light-gray dark:bg-very-dark-blue dark:bg-bg-mobile-dark md:dark:bg-bg-desktop-dark">
      <div className="max-w-[600px] w-[85%] mx-auto">
        <Header newTodo={newTodo} handleTodoInput={handleTodoInput} handleFormSubmit={handleFormSubmit}/>
        <section className="bg-white mt-4 shadow-xl rounded-md dark:bg-very-dark-desat-blue">
          <ul>
            {
              todoDisplayed(filterState)
            }
          </ul>
          <Footer uncompleted={Todos.filter(item => item.state === false).length} handleClearCompleted={handleClearCompleted} filterState={filterState} handleFilter={handleFilter}/>
        </section>
        <FooterExt filterState={filterState} handleFilter={handleFilter}/>
        <span className="text-center block mt-10 text-dark-grayish-blue dark:text-dark-grayish-blue-dark">
          <p>
            Drag and drop to reorder list
          </p>
        </span>
      </div>
    </main>
  )
}