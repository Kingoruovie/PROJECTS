const hamburgerMenuBtn = document.querySelector(".hamburger");
const closeBtn = document.querySelector(".close");
const overlay = document.querySelector(".overlay");
const menu = document.querySelector(".nav-menu");

const dropDowns = document.querySelectorAll(".drop-down > div")
dropDowns.forEach((dropDown) => {
    dropDown.addEventListener("click", () => {
        const dropDownCont = dropDown.parentElement.querySelector(".drop-down-container")
        const arrow = dropDown.querySelector("img")
        
        if (dropDownCont.style.height) {
            dropDownCont.style.height = null
            arrow.src = "images/icon-arrow-down.svg"
        } else {
            arrow.src = "images/icon-arrow-up.svg"
            dropDownCont.style.height = dropDownCont.scrollHeight + "px"
        }
        
    })
})

hamburgerMenuBtn.addEventListener("click", () => {
    overlay.style.width = "100%"
    menu.style.width = "65vw"
})

closeBtn.addEventListener("click", () => {
    menu.style.width = null
    overlay.style.width = "0"
})