import themeClasses from "../utils/utils"

import Button from "./Button"
import DelButton from "./DelButton"
import ResetButton from "./ResetButton"
import EqualButton from "./EqualButton"
import DecButton from "./DecButton"
import OperationButton from "./OperationButton"

type KeypadParamType = {
    theme: string, 
    handleKeys: (value: string) => void, 
    handleDel: () => void,
    handleReset: () => void,
    handleDecimal: () => void,
    handleOperation: (operation: string) => void,
    handleEqual: () => void
}


export default function Keypad({theme, handleKeys, handleDel, handleReset, handleDecimal, handleOperation, handleEqual}: KeypadParamType) {
    return (
        <article className={`text-3xl md:text-4xl md: p-6 rounded-md mt-6 flex flex-col gap-4 md:gap-7 ${themeClasses[theme].keypadBg}`}>
            <div className="flex gap-3 md:gap-6">
                <Button value={'7'} theme={theme} handleKeys={handleKeys}/>
                <Button value={'8'} theme={theme} handleKeys={handleKeys}/>
                <Button value={'9'} theme={theme} handleKeys={handleKeys}/>
                <DelButton value={'Del'} theme={theme} handleDel={handleDel}/>
            </div>
            <div className="flex gap-3 md:gap-6">
                <Button value={'4'} theme={theme} handleKeys={handleKeys}/>
                <Button value={'5'} theme={theme} handleKeys={handleKeys}/>
                <Button value={'6'} theme={theme} handleKeys={handleKeys}/>
                <OperationButton value={'+'} theme={theme} handleOperation={handleOperation}/>
            </div>
            <div className="flex gap-3 md:gap-6">
                <Button value={'1'} theme={theme} handleKeys={handleKeys}/>
                <Button value={'2'} theme={theme} handleKeys={handleKeys}/>
                <Button value={'3'} theme={theme} handleKeys={handleKeys}/>
                <OperationButton value={`-`} theme={theme} handleOperation={handleOperation}/>
            </div>
            <div className="flex gap-3 md:gap-6">
                <DecButton value={'.'} theme={theme} handleDecimal={handleDecimal}/>
                <Button value={'0'} theme={theme} handleKeys={handleKeys}/>
                <OperationButton value={'/'} theme={theme} handleOperation={handleOperation}/>
                <OperationButton value={'×'} theme={theme} handleOperation={handleOperation}/>
            </div>
            <div className="flex gap-3 md:gap-6">
                <ResetButton value={'Reset'} theme={theme} handleReset={handleReset}/>
                <EqualButton value={'='} theme={theme} handleEqual={handleEqual}/>
            </div>
        </article>
    )
}