import { useState, useRef } from "react"
import React from "react"
import themeClasses from "./utils/utils"

import Header from "./components/Header"
import Screen from "./components/Screen"
import Keypad from "./components/Keypad"

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [input, setInput] = useState('')
  const ref = useRef({
    previousValue: 0,
    nextValue: 0,
    operation: ''
  })

  
  class Calculator {
    handleKeys (value: string | number) {
      setInput(input + value)
      ref.current.nextValue = Number(input + value)
      console.log(ref.current)
    }

    handleDel () {
      if (input !== '') {
        const newInput: string[] = input.split('')
        newInput.pop()
        setInput(newInput.join(''))
        ref.current.nextValue = Number(newInput.join(''))
      }
    }

    handleReset () {
      setInput('')
      ref.current.nextValue = 0
      ref.current.previousValue = 0
    }

    handleDecimal () {
      if (!input.includes('.')) {
        setInput(input + '.')
        ref.current.previousValue = Number(input + '.')
      }
    }

    handleEqual () {
      let total: number = 0
      if (ref.current.operation === '+') {
        total = ref.current.nextValue + ref.current.previousValue
      } else if (ref.current.operation === '-') {
        total = ref.current.nextValue - ref.current.previousValue
      } else if (ref.current.operation === '×') {
        total = ref.current.nextValue * ref.current.previousValue
      } else if (ref.current.operation === '/') {
        try {
          total = ref.current.nextValue / ref.current.previousValue
        } catch (err) {
          setInput('Err')
          return
        }
      }
      ref.current.previousValue = total
      ref.current.nextValue = 0
      setInput(String(total))
      ref.current.operation = ''
    }

    handleOperation (operation: string) {
      switch (operation) {
        case '+':
          
          ref.current.previousValue = ref.current.nextValue
          ref.current.nextValue = 0
          ref.current.operation = operation
          setInput('')
          break
        case '-':
          if (ref.current.nextValue === 0) {
            setInput('-')
          } else {
            ref.current.previousValue = ref.current.nextValue
            ref.current.nextValue = 0
            ref.current.operation = operation
            setInput('')
          }
          break
        case '/':
          ref.current.previousValue = ref.current.nextValue
          ref.current.nextValue = 0
          ref.current.operation = operation
          setInput('')
          break
        case '×':
          ref.current.previousValue = ref.current.nextValue
          ref.current.nextValue = 0
          ref.current.operation = operation
          setInput('')
          break
      }
    }
  }
  const calculator = new Calculator()

  const changeTheme = (colorScheme: string) => {
    setTheme(colorScheme)
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (event.target.value === '-' || String(Number(event.target.value)) !== 'NaN') {
      setInput(event.target.value)
    }
  }

  return (
    <main className={`font-display min-h-[100vh] md:flex justify-center items-center ${themeClasses[theme].mainBg} ${themeClasses[theme].textColor1}`}>
      <div className="w-[90%] max-w-lg mx-auto pt-8">
        <section>
          <Header theme={theme} changeTheme={changeTheme}/>
        </section>
        <section className="mt-8">
          <Screen theme={theme} value={input} handleInput={handleInput}/>
          <Keypad 
            theme={theme} 
            handleKeys={calculator.handleKeys} 
            handleDel={calculator.handleDel}
            handleReset={calculator.handleReset}
            handleDecimal={calculator.handleDecimal}
            handleOperation={calculator.handleOperation}
            handleEqual={calculator.handleEqual}
          />
        </section>
      </div>
    </main>
  )
}