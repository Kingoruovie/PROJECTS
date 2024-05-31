type filterStateType = 'all' | 'active' | 'completed'


export default function Footer ({ uncompleted, handleClearCompleted, filterState, handleFilter }: { uncompleted: number, handleClearCompleted: () => void, filterState:  filterStateType, handleFilter: (filtState: filterStateType) => void}) {
    const baseStyle: string = "hover:text-very-dark-grayish-blue dark:hover:text-light-grayish-blue-dark"
    const activeStyle = baseStyle + ' text-bright-blue'
    
    return (
        <footer className="md:text-base flex justify-between py-4 px-5 text-dark-grayish-blue dark:text-dark-grayish-blue-dark">
            <span>
                <p>{uncompleted} items left</p>
            </span>
            <div className="font-bold hidden md:flex md:gap-6">
                <button type="button" className={filterState === 'all' ? activeStyle: baseStyle} onClick={() => handleFilter('all')}>All</button>
                <button type="button" className={filterState === 'active' ? activeStyle: baseStyle} onClick={() => handleFilter('active')}>Active</button>
                <button type="button" className={filterState === 'completed' ? activeStyle: baseStyle} onClick={() => handleFilter('completed')}>Completed</button>
            </div>
            <span>
                <button type="button" onClick={handleClearCompleted} className="hover:text-very-dark-grayish-blue dark:hover:text-light-grayish-blue-dark">Clear Completed</button>
            </span>
        </footer>
    )
}