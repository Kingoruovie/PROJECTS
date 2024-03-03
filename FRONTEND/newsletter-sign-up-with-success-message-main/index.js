const form = document.querySelector("form")
const email = document.querySelector("#email-address")
const error = document.querySelector(".error")
const success = document.querySelector("#success")
const signUp = document.querySelector("#sign-up")
const dismiss = document.querySelector("#success button")

form.addEventListener("submit", function (event) {
    event.preventDefault()
    if (email.validity.typeMismatch) {
        email.classList.add("invalid")
        error.textContent = "Valid email required"
    } else if (email.validity.valueMissing) {
        email.classList.add("invalid")
        error.textContent = "Email field required"
    } else {
        signUp.style.display = "none"
        success.style.display = "flex"
        email.classList.remove("invalid")
        error.textContent = ""
        email.value = ""
    }
})

dismiss.addEventListener("click", function () {
    signUp.style.display = "flex"
    success.style.display = "none"
})