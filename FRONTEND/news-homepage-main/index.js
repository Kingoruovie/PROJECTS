const hamBtn = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const closeBtn = document.querySelector(".close")
const body = document.querySelector("body")


hamBtn.addEventListener("click", function() {
    nav.style.width = "18rem"
    body.style.backgroundColor = "hsla(0, 0%, 0%, 0.4)"
})

closeBtn.addEventListener("click", function() {
    nav.style.width = "0"
    body.style.backgroundColor = "hsl(36, 100%, 99%)"
})

window.addEventListener("resize", function() {
    if (Number(window.innerWidth) > 750) {
        nav.style.width = "auto"   
    } else {
        nav.style.width = "0"    
    }
})

window.addEventListener("DOMContentLoaded", function() {
    if (Number(window.innerWidth) > 750) {
        nav.style.width = "auto"   
    } else {
        nav.style.width = "0"    
    }
})

