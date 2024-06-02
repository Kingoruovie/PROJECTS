import themeClasses from "../utils/utils";


export default function Screen({theme}: {theme: string}) {
    return (
        <input type="number" name="" id="" className={`text-5xl py-6 px-5 focus:outline-none text-right w-full rounded-lg ${themeClasses[theme].screenBg}`}/>
    )
}