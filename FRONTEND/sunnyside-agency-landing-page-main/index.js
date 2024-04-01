const toggleBtn = document.querySelector("button")
const nav = document.querySelector("header nav")


toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("show")
})