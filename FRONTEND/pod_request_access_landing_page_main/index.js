const form = document.querySelector("form");
const email = document.querySelector("#email");
const error = document.querySelector("form div span");


form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (email.validity.typeMismatch) {
        error.textContent = "Please provide a valid email address"
        email.classList.add("error_border")
    } else if (email.validity.valueMissing) {
        error.textContent = "This field cannot be left empty";
        email.classList.add("error_border");
    } else {
        error.textContent = ""
        email.classList.remove("error_border")
        email.value = ""
    }
})