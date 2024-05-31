import useTheme from "../custom_hooks/userTheme";

// Assets
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg"

import React from "react";

type InputEvent = React.ChangeEvent<HTMLInputElement>
type FormEvent = React.FormEvent<HTMLFormElement>


export default function Header ({ newTodo, handleTodoInput, handleFormSubmit}: {newTodo: string, handleTodoInput: (event: InputEvent) => void, handleFormSubmit: (event: FormEvent) => void}) {
    const [theme, toggleTheme] = useTheme()

    return (
        <header className="pt-12 md:pt-16 lg:pt-20">
            <article className="flex uppercase justify-between items-center">
                <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-[10px] leading-none font-sans font-bold text-very-light-gray align-baseline">
                    Todo
                </h1>
                <button onClick={toggleTheme} className="align-middle">
                    <img src={theme === "dark" ? sun : moon} alt="" className="w-5 h-auto md:w-7 lg:w-9"/>
                </button>
            </article>
            <form onSubmit={handleFormSubmit} action="#" className="mt-8 w-full rounded-md flex items-center gap-3 px-5 py-3 bg-white dark:bg-very-dark-desat-blue">    
                <button type="submit" className="h-6 w-6 border border-light-grayish-blue rounded-full dark:border-very-dark-grayish-blue-dark-2"></button>
                <input value={newTodo} onChange={handleTodoInput} type="text" placeholder="Create a new todo..." className="pt-[5px] align-middle text-sm md:text-base lg:text-lg text-very-dark-grayish-blue dark:text-light-grayish-blue-dark focus:outline-0 flex-grow leading-none placeholder:text-dark-grayish-blue dark:placeholder:text-dark-grayish-blue-dark bg-inherit"/>
            </form>
        </header>
    )
}