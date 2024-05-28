import useTheme from "../custom_hooks/userTheme";

// Assets
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg"

export default function Header () {
    const [theme, toggleTheme] = useTheme()

    return (
        <header className="pt-12">
            <article className="flex uppercase justify-between items-center">
                <h1 className="text-2xl tracking-[10px] font-sans font-bold text-very-light-gray">
                    Todo
                </h1>
                <button onClick={toggleTheme} className="">
                    <img src={theme === "dark" ? sun : moon} alt="" />
                </button>
            </article>
            <form action="#" className="mt-8 w-full rounded-md flex items-center gap-3 px-5 py-3 bg-white dark:bg-very-dark-desat-blue">    
                <button type="submit" className="h-6 w-6 border border-light-grayish-blue rounded-full"></button>
                <input type="text" placeholder="Create a new todo..." className="align-middle text-base text-very-dark-grayish-blue focus:outline-0 flex-grow leading-none placeholder:text-dark-grayish-blue"/>
            </form>
        </header>
    )
}