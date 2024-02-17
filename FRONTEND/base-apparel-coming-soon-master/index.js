const form = document.querySelector("form")
const email = document.querySelector("input#email-address")
const emailError = document.querySelector("span.error")
const iconError = document.querySelector("form > span:nth-child(1)")


function showError () {
    if (email.validity.typeMismatch) {
        emailError.textContent = "Please provide a valid email address"
        iconError.style.display = "block"
    } 
    
}

email.addEventListener("input", function () {
    if (email.validity.valid) {
        emailError.textContent = ""
        iconError.style.display = "none";
    } else {
        showError()
    }
})

form.addEventListener("submit", function (event) {
    event.preventDefault()
    console.log("Hello, world!")
    
    if (!email.validity.valid) {
        showError()
    }
})