import themeClasses from "../utils/utils"

export default function Button(
    {value, theme, handleKeys}: 
    {value: string, theme: string, handleKeys: (value: string) => void}
) {
    const baseStyle: string = `${themeClasses[theme].bgBtn3} ${themeClasses[theme].shadowBtn3} flex-grow basis-full py-3 rounded-md align-baseline`
    function getTextColor(colorScheme: string): string {
        if (colorScheme === 'dark') {
            return baseStyle + ' text-dark-text-color-2'
        } else if (colorScheme === 'light') {
            return baseStyle + ' text-light-text-color-1'
        } else {
           return baseStyle + ' text-custom-text-color-1'
        }
    }

    return (
        <button type="button" className={getTextColor(theme)} onClick={() => handleKeys(value)}>{value}</button>
    )
}