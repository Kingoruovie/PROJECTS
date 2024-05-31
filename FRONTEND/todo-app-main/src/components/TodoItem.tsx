import cross from '../assets/icon-cross.svg'

type TodoItemType = {
    value: string, 
    state: boolean, 
    id: number, 
    handleState: (id: number) => void, 
    handleDeleteOneTodo: (id: number) => void, 
    findTodoIndex: (id: number) => number,
    handleDragStart: (index: number) => void,
    handleDragEnter: (index: number) => void,
    handleDragEnd: (index: number) => void
}

export default function TodoItem ({ value, state, id, handleState, handleDeleteOneTodo, findTodoIndex, handleDragStart, handleDragEnter, handleDragEnd}: TodoItemType) {
    const completed: string = 'cursor-pointer pt-[6px] align-baseline overflow-hidden break-words text-light-grayish-blue dark:text-dark-grayish-blue-dark line-through flex-grow'
    const uncompleted: string = 'cursor-pointer pt-[6px] align-baseline overflow-hidden break-words text-wrap  text-very-dark-grayish-blue dark:text-light-grayish-blue-dark flex-grow'

    return (
        <li
        draggable={true}
        onDragStart={() => handleDragStart(findTodoIndex(id)) }
        onDragEnter={() => handleDragEnter(findTodoIndex(id))}
        onDragEnd={() => handleDragEnd}
        className='group list-none leading-none px-5 py-3 flex items-start gap-3 border-b border-light-grayish-blue dark:border-very-dark-grayish-blue-dark-1'>
            <span className='h-[26px] flex justify-center items-center rounded-full aspect-square hover:bg-gradient-to-r hover:from-gradient-1 hover:to-gradient-2'>
                <input checked={state} onChange={() => handleState(id)} type="checkbox" name="" id="" className='cursor-pointer appearance-none hover:bg-white dark:hover:bg-very-dark-desat-blue hover:border-none h-6 w-6 border border-light-grayish-blue rounded-full relative checked:bg-gradient-to-r checked:from-gradient-1 checked:to-gradient-2 after:content-link after:invisible checked:after:visible after:absolute after:top-[55%] after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 dark:border-very-dark-grayish-blue-dark-2'/>
            </span>
            <p className={state ? completed : uncompleted}>{value}</p>
            <span className='invisible group-hover:visible pt-1 cursor-pointer'>
                <button type="button" className='h-4 w-4' onClick={() => handleDeleteOneTodo(id)}>
                    <img src={cross} alt="" className=''/>
                </button>
            </span>
        </li>
    )
}