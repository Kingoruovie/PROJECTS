const readState = document.querySelectorAll(".read-state");
const btn = document.querySelector("button")

btn.addEventListener("click", () => {
    readState.forEach((item) => {
        item.style.display = "none"
    })
})