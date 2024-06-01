import themeClasses from "../utils/utils"


type HeaderInputType = {
    theme: string,
    changeTheme: (colorScheme: string) => void
}

export default function Header ({theme, changeTheme}: HeaderInputType) {
    const toggleBtnBg = (colorScheme: string) =>  {
        if (colorScheme !== theme) {
            return themeClasses[theme].toggleBg
        }
        return themeClasses[theme].toggleBtn
    }
    return (
        <header className="flex justify-between items-center">
            <h1 className="text-4xl">
                calc
            </h1>
            <article className="text-sm flex flex-col items-end">
                <div className="flex gap-5 pr-2">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>
                <div className="flex items-center gap-8">
                    <h2 className="uppercase">
                        theme
                    </h2>
                    <div className={`flex gap-2 items-center rounded-full p-[5px] ${themeClasses[theme].toggleBg}`}>
                        <button type="button" onClick={() => changeTheme('dark')} className={`h-4 aspect-square rounded-full ${toggleBtnBg('dark')} hover:opacity-80`}></button>
                        <button type="button" onClick={() => changeTheme('light')} className={`h-4 aspect-square rounded-full ${toggleBtnBg('light')} hover:opacity-80`}></button>
                        <button type="button" onClick={() => changeTheme('custom')} className={`h-4 aspect-square rounded-full ${toggleBtnBg('custom')} hover:opacity-80`}></button>
                    </div>
                </div>
            </article>
        </header>
    )
}