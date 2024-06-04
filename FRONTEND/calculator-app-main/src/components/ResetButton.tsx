import themeClasses from "../utils/utils"

type ResetButtonParamType = {
    value: string | number, 
    theme: string,
    handleReset: () => void
}

export default function ResetButton(
    {value, theme, handleReset}: 
    ResetButtonParamType
) {
    const basetyle: string = `${themeClasses[theme].bgBtn1} ${themeClasses[theme].shadowBtn1} flex-grow basis-full rounded-md text-xl uppercase align-baseline`
    function getTextColor(colorScheme: string): string {
        if (colorScheme === 'dark') {
            return basetyle +' text-dark-text-color-1'
        } else if (colorScheme === 'light') {
            return basetyle +' text-light-text-color-2'
        } else {
            return basetyle +' text-custom-text-color-2'
        }
    }

    return (
        <button type="button" className={getTextColor(theme)} onClick={handleReset}>{value}</button>
    )
}