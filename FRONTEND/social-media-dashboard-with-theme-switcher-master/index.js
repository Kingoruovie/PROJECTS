function setTheme () {
    if ((localStorage.theme === 'dark') || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add("dark")
    } else {
        document.documentElement.classList.remove("dark")
    }
}

document.querySelector("input").addEventListener("click", (event) => {
    if (event.target.checked) {
        localStorage.theme = "light"
    } else {
        localStorage.theme = "dark"
    }
    setTheme()
})

setTheme()