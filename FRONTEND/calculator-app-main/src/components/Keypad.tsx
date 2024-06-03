import themeClasses from "../utils/utils"

import Button from "./Button"
import DelButton from "./DelButton"
import ResetButton from "./ResetButton"
import EqualButton from "./EqualButton"


export default function Keypad({theme}: {theme: string}) {
    return (
        <article className={`text-3xl md:text-4xl md: p-6 rounded-md mt-6 flex flex-col gap-4 md:gap-7 ${themeClasses[theme].keypadBg}`}>
            <div className="flex gap-3 md:gap-6">
                <Button value={7} theme={theme}/>
                <Button value={8} theme={theme}/>
                <Button value={9} theme={theme}/>
                <DelButton value={'Del'} theme={theme}/>
            </div>
            <div className="flex gap-3 md:gap-6">
                <Button value={4} theme={theme}/>
                <Button value={5} theme={theme}/>
                <Button value={6} theme={theme}/>
                <Button value={'+'} theme={theme}/>
            </div>
            <div className="flex gap-3 md:gap-6">
                <Button value={1} theme={theme}/>
                <Button value={2} theme={theme}/>
                <Button value={3} theme={theme}/>
                <Button value={`-`} theme={theme}/>
            </div>
            <div className="flex gap-3 md:gap-6">
                <Button value={'.'} theme={theme}/>
                <Button value={0} theme={theme}/>
                <Button value={'/'} theme={theme}/>
                <Button value={'×'} theme={theme}/>
            </div>
            <div className="flex gap-3 md:gap-6">
                <ResetButton value={'Reset'} theme={theme}/>
                <EqualButton value={'='} theme={theme}/>
            </div>
        </article>
    )
}