import React, { useRef, useEffect } from "react";
import themeClasses from "../utils/utils";


export default function Screen({theme, value, handleInput}: {theme: string, value: string, handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void} ) {
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [value, theme])

    return (
        <input ref={inputRef} value={value} onChange={e => handleInput(e)} type="text" name="" id="" className={`caret-transparent text-5xl md:text-6xl py-6 md:py-7 px-5 focus:outline-none text-right w-full rounded-lg ${themeClasses[theme].screenBg}`}/>
    )
}