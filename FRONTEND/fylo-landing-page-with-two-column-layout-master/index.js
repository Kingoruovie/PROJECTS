const headerInput = document.querySelector("header input")
const mainInput = document.querySelector("main input")
const headerForm = document.querySelector("header form")
const mainForm = document.querySelector("main form")

headerForm.addEventListener("submit", (event) => {
    event.preventDefault()
    if (headerInput.validity.valid) {
        alert(`Your email ${headerInput.value} has been registered`)
        document.querySelector("header form span").classList.add("hidden")
        headerInput.classList.add("border-veryDarkBlue")
        headerInput.classList.remove("border-red-400")
    } else {
        document.querySelector("header form span").classList.remove("hidden")
        headerInput.classList.remove("border-veryDarkBlue")
        headerInput.classList.add("border-red-400")
    }
})

mainForm.addEventListener("submit", (event) => {
    event.preventDefault()
    if (mainInput.validity.valid) {
        alert(`Your email ${headerInput.value} has been registered`)
        document.querySelector("main form span").classList.add("hidden")
        // mainInput.classList.add("border-veryDarkBlue")
        mainInput.classList.remove("border-red-400")
    } else {
        document.querySelector("main form span").classList.remove("hidden")
        // mainInput.classList.remove("border-veryDarkBlue")
        mainInput.classList.add("border-red-400")
    }
})
