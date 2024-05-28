import { useEffect, useState } from "react";

type CustomTheme = [string, () => void]

const useTheme = (): CustomTheme => {
    const [theme, setTheme] = useState<string>(
        localStorage.getItem('theme') ||
        (window.matchMedia('(prefer-color-scheme: dark)').matches ? 'dark' : 'light')
    );

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add('dark');
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((previousTheme) => previousTheme === 'dark' ? 'light' : 'dark');
    }

    return [theme, toggleTheme]
};


export default useTheme;
