import themeClasses from "../utils/utils"

export default function EqualButton(
    {value, theme}: 
    {value: string | number, theme: string}
) {
    const baseStyle: string = `${themeClasses[theme].bgBtn2} ${themeClasses[theme].shadowBtn2} flex-grow basis-full rounded-md text-xl uppercase align-baseline py-4`
    function getTextColor(colorScheme: string): string {
        if (colorScheme === 'dark') {
            return baseStyle + ' text-dark-text-color-1'
        } else if (colorScheme === 'light') {
            return baseStyle + ' text-light-text-color-2'
        } else {
            return baseStyle + ' text-custom-text-color-3'
        }
    }

    return (
        <button type="button" className={getTextColor(theme)}>{value}</button>
    )
}