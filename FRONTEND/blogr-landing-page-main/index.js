const hamburgerBtn = document.querySelector("header button")
const hamburgerImg = document.querySelector("header button img")
const mobileNav = document.querySelector("header nav > ul")
const spanDropDowns = document.querySelectorAll("header ul li span")
let openHam = false


hamburgerBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("fade-in")
    openHam = !openHam
    if (openHam) {
        hamburgerImg.src = "images/icon-close.svg"
    } else {
        hamburgerImg.src = "images/icon-hamburger.svg"
    }
})


spanDropDowns.forEach( spanDropDown => {
    spanDropDown.addEventListener("click", () => {
        const dropDown = spanDropDown.parentNode.querySelector("ul")
        if (dropDown.style.height == "") {
            dropDown.style.height = dropDown.scrollHeight + "px";
            spanDropDown.querySelector("img").style.transform = "rotate(180deg)"
        } else {
            dropDown.style.height = null
            spanDropDown.querySelector("img").style.transform = null
        }
    })
})