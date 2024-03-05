const dayInputDiv = document.querySelector(".inputs__day");
const monthInputDiv = document.querySelector(".inputs__month");
const yearInputDiv = document.querySelector(".inputs__year");
const dayInput = dayInputDiv.querySelector("#day")
const monthInput = monthInputDiv.querySelector("#month")
const yearInput = yearInputDiv.querySelector("#year")
const dayLabel = dayInputDiv.querySelector("label")
const monthLabel = monthInputDiv.querySelector("label")
const yearLabel = yearInputDiv.querySelector("label")
const daySpan = dayInputDiv.querySelector("span")
const monthSpan = monthInputDiv.querySelector("span")
const yearSpan = yearInputDiv.querySelector("span")
const form = document.querySelector("form")
const monthObj = {
    "01": 31,
    "02": 28,
    "03": 31,
    "04": 30,
    "05": 31,
    "06": 30,
    "07": 31,
    "08": 31,
    "09": 30,
    "10": 31,
    "11": 30,
    "12": 31,
}
const todayDate = new Date()


// Update Inputs with zeros at the left
function updateInput(event) {
    const mainLength = event.target.getAttribute("maxlength")
    if (event.target.value !== "" && event.target.value.length < mainLength) {
        const zeroFillLength = mainLength - event.target.value.length
        switch (zeroFillLength) {
            case 0:
            case 4:
                zeroFill = ""
                break
            case 1:
                zeroFill = "0"
                break
            case 2:
                zeroFill = "00"
                break
            case 3:
                zeroFill = "000"
        }
        event.target.value = zeroFill  + event.target.value
    }
}
dayInput.addEventListener(
    "blur",
    updateInput
)
monthInput.addEventListener(
    "blur",
    updateInput
)
yearInput.addEventListener(
    "blur",
    updateInput
)



// Leap Year
function checkLeapYear (year) {
    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    } else {
        return true
    }
}


function showError (label, input, span, text) {
    label.classList.add("error")
    input.classList.add("error-border")
    span.textContent = text
}

function removeError (label, input, span, text) {
    label.classList.remove("error")
    input.classList.remove("error-border")
    span.textContent = text
}


function validateDay () {
    const monthDays = monthInput.value == "" ? 31: monthObj[monthInput.value]
    if (dayInput.value == "") {
        showError(dayLabel, dayInput, daySpan, "This field is required")
        return false
    } else if (Number(dayInput.value) < 1 || Number(dayInput.value) > monthDays) {
        showError(dayLabel, dayInput, daySpan, "Must be a valid day")
        return false
    } else {
        removeError(dayLabel, dayInput, daySpan, "")
        return true
    }
}

function validateMonth () {
    if (monthInput.value == "") {
        showError(monthLabel, monthInput, monthSpan, "This field is required")
        return false
    } else if (Number(monthInput.value) < 1 || Number(monthInput.value) > 12) {
        showError(monthLabel, monthInput, monthSpan, "Must be a valid month")
        return false
    } else {
        removeError(monthLabel, monthInput, monthSpan, "")
        return true
    }
}


function validateYear () {
    if (yearInput.value == "") {
        showError(yearLabel, yearInput, yearSpan, "This field is required")
        return false
    } else if (Number(yearInput.value) < 1 || Number(yearInput.value) > todayDate.getFullYear()) {
        showError(yearLabel, yearInput, yearSpan, "Must be a valid year")
        return false
    } else {
        removeError(yearLabel, yearInput, yearSpan, "")
        return true
    }
}


function calculateAge() {
    const birthdDate = new Date (Number(yearInput.value), Number(monthInput.value), Number(dayInput.value))
    let result = Math.abs(todayDate.getTime() - birthdDate.getTime())
    result = Math.round(result / (1000 * 60 * 60 * 24))
    years = Math.floor(result / 365)
    month = Math.floor((result % 365) / 29)
    day = (result % 365) % 28
    return [years, month, day]
}


function validateAll (event) {
    event.preventDefault()
    if (checkLeapYear(Number(yearInput.value))) {
        monthObj["02"] = 29
    } else {
        monthObj["02"] = 28
    }
    const yearValidationState = validateYear()
    const monthValidationState = validateMonth()
    const dayValidationState = validateDay()
    if (yearValidationState && monthValidationState && dayValidationState) {
        result = calculateAge()
        const years = document.querySelector(".result .result__years span")
        const months = document.querySelector(".result .result__months span")
        const days = document.querySelector(".result .result__days span")
        years.textContent = result[0]
        months.textContent = result[1]
        days.textContent = result[2]
        dayInput.value = ""
        monthInput.value = ""
        yearInput.value = ""
    }
    
}

form.addEventListener(
    "submit",
    validateAll
)