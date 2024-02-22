const form = document.querySelector("form")
const email = document.querySelector("#email")
const errorText = document.querySelector("header form span")


form.addEventListener("submit", function(event) {
    event.preventDefault()
    if (email.validity.valueMissing) {
        showError("Please this field cannot be left empty")
    }

    if (email.validity.typeMismatch) {
        showError("Please provide a valid email address")
    }
})

function showError (text) {
    email.classList.add("error-border")
    errorText.textContent = text
}

email.addEventListener("input", () => {
    email.classList.remove("error-border")
    errorText.textContent = ""
})