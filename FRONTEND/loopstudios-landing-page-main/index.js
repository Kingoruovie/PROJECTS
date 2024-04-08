const hamburger = document.querySelector("header > div > div > button")
const close = document.querySelector("nav button")
const menu = document.querySelector("nav")


hamburger.addEventListener("click", () => {
    console.log("Hey")
    menu.classList.remove("hidden")
    menu.classList.add("grid");
})

close.addEventListener("click", () => {
    menu.classList.remove("grid")
    menu.classList.add("hidden")
})