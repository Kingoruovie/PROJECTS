const btn = document.querySelector("button");
const menu = document.querySelector("#menu");
let close = true
btn.addEventListener("click", () => {
    if (close) {
        menu.classList.remove("h-0");
        menu.classList.add("h-[calc(100vh-64px)]");
        btn.querySelector("img").src = "images/icon-close.svg"
    } else {
        menu.classList.remove("h-[calc(100vh-64px)]");
        menu.classList.add("h-0");
        btn.querySelector("img").src = "images/icon-hamburger.svg"
    }
    close = !close
})