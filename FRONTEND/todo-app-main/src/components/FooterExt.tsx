type filterStateType = 'all' | 'active' | 'completed'


export default function FooterExt ({ filterState, handleFilter }: { filterState:  filterStateType, handleFilter: (filtState: filterStateType) => void}) {
    const baseStyle: string = "hover:text-very-dark-grayish-blue dark:hover:text-light-grayish-blue-dark"
    const activeStyle = baseStyle + ' text-bright-blue'

    return (
        <div className="font-bold md:text-base text-dark-grayish-blue mt-4 dark:text-dark-grayish-blue-dark bg-white dark:bg-very-dark-desat-blue shadow-lg py-4 flex justify-center gap-6 rounded-md md:hidden">
             <button type="button" className={filterState === 'all' ? activeStyle: baseStyle} onClick={() => handleFilter('all')}>All</button>
            <button type="button" className={filterState === 'active' ? activeStyle: baseStyle} onClick={() => handleFilter('active')}>Active</button>
            <button type="button" className={filterState === 'completed' ? activeStyle: baseStyle} onClick={() => handleFilter('completed')}>Completed</button>
        </div>
    )
}