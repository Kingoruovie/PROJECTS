const hamburger = document.querySelector("nav button");
const menu = document.querySelector("nav ul");

const backThisProjectBtn = document.querySelector("header div button:nth-child(1)");
const closeFormDialogBtn = document.querySelector("#dialog-form > div img")
const modalForm = document.querySelector("#dialog-form");
const overlay = document.querySelector("#overlay");

const selectRewardBtns = document.querySelectorAll("#projects article button");

const radioBtns = document.querySelectorAll("#dialog-form form article > div:nth-child(1) > div");

const form = document.querySelector("#dialog-form form");
const success = document.querySelector("#completed-dialog");


function openFormDialog() {
    modalForm.classList.remove("hidden");
    overlay.classList.remove("hidden")
}

function closeFormDialog() {
    modalForm.classList.add("hidden")
    overlay.classList.add("hidden")
}


backThisProjectBtn.addEventListener("click", openFormDialog);
closeFormDialogBtn.addEventListener("click", closeFormDialog);
selectRewardBtns.forEach(selectRewardBtn => {
    selectRewardBtn.addEventListener("click", openFormDialog)
})


// Node list are not arrays, although built from array they lack some methods
// from array like slice. Also, made this decision to avoid the last radio
// being responsive to mouse click
Array.from(radioBtns).slice(0, radioBtns.length - 2).forEach(radioBtn => {
    radioBtn.addEventListener("click", () => {
        const activeRadio = document.querySelector(".active-radio")
        radio = radioBtn.querySelector("input");
        if (activeRadio) {
            activeRadio.classList.remove("active-radio")
            activeRadio.querySelector("div:nth-child(2)").classList.remove("flex")
            activeRadio.querySelector("div:nth-child(2)").classList.add("hidden")
        }
        radioBtn.parentElement.parentElement.classList.add("active-radio")
        radioBtn.parentElement.parentElement.querySelector("div:nth-child(2)").classList.remove("hidden")
        radioBtn.parentElement.parentElement.querySelector("div:nth-child(2)").classList.add("flex")
    })
})



form.addEventListener("submit", (event) => {
    event.preventDefault()
    const activeRadio = document.querySelector(".active-radio")
    if (activeRadio) {
        const pledge = activeRadio.querySelector("input[type='number']")
        const total = document.querySelector("#stats > div:nth-child(1) div:nth-child(1) span:nth-child(1)")
        const progressBar = document.querySelector("#stats > div:nth-child(2) span")
        console.log(total.innerHTML)
    } else {
        console.log("Naaaa")
    }
})


hamburger.addEventListener("click", () => {
    const hamImg = hamburger.querySelector("img");
    if (menu.style.height) {
        hamImg.src = "images/icon-hamburger.svg";
        menu.style.height = null;
    } else {
        hamImg.src = "images/icon-close-menu.svg";
        menu.style.height = menu.scrollHeight + "px";
    }
})
