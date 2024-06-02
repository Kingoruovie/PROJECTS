import themeClasses from "../utils/utils"
import Button from "./Button"
// import SpecialButton from "./SpecialButton"


export default function Keypad({theme}: {theme: string}) {
    return (
        <article className={`rounded-md mt-6 ${themeClasses[theme].keypadBg}`}>
            <div>
                <Button/>
                <Button/>
                <Button/>
                <Button/>
            </div>
            <div>
                <Button/>
                <Button/>
                <Button/>
                <Button/>
            </div>
            <div>
                <Button/>
                <Button/>
                <Button/>
                <Button/>
            </div>
            <div>
                <Button/>
                <Button/>
                <Button/>
                <Button/>
            </div>
            <div>
                <Button/>
                <Button/>
            </div>
        </article>
    )
}