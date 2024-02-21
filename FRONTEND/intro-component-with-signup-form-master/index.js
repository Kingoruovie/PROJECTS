const form = document.querySelector("form")
const submitBtn = document.querySelector("button")
const firstName = document.querySelector("#first-name")
const lastName = document.querySelector("#last-name")
const password = document.querySelector("#password")
const email = document.querySelector("#email")


form.addEventListener("submit", function (event) {
    event.preventDefault()
    requiredValue(firstName)
    requiredValue(lastName)
    requiredValue(password)
    emailCheck()

})


function requiredValue(input) {
    const id = input.getAttribute('id') 
    const errorIcon = document.querySelector(`img.${id}`)
    const errortext = document.querySelector(`span.${id}`)
    if (input.validity.valueMissing) {
        input.classList.add("invalid-input")
        errorIcon.style.display = "block"
        errortext.style.display = "block"
    }
}

function emailCheck () {
    const id = email.getAttribute('id') 
    const errorIcon = document.querySelector(`img.${id}`)
    const errortext = document.querySelector(`span.${id}`)
    if (email.validity.typeMismatch || email.validity.valueMissing) {
        
        email.classList.add("invalid-input")
        errorIcon.style.display = "block"
        errortext.style.display = "block"
    }
}


document.querySelectorAll("input").forEach(function(input) {
    input.addEventListener("input", () => {
        const id = input.getAttribute('id') 
        const errorIcon = document.querySelector(`img.${id}`)
        const errortext = document.querySelector(`span.${id}`)
        input.classList.remove("invalid-input")
        errorIcon.style.display = "none"
        errortext.style.display = "none"
    })
})