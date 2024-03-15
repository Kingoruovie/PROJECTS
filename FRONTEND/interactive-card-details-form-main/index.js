const cardName = document.querySelector("#name");
const nameErr = document.querySelector(".name-error")
const cardNumber = document.querySelector("#number");
const numberErr = document.querySelector(".number-error");
const cardExpMonth = document.querySelector("#expiry-month");
const cardExpYear = document.querySelector("#expiry-year");
const expiryErr = document.querySelector(".exp-error");
const csv = document.querySelector("#csv");
const csvErr = document.querySelector(".csv-error");

const cardFrontNum = document.querySelector(".number");
const cardFrontName = document.querySelector(".front > div > div > span:nth-child(1)");
const cardFrontExpiry = document.querySelector(".front > div > div > span:nth-child(2)");
const cardBackCSV = document.querySelector(".csv");


cardName.addEventListener("input", (event) => {
    let value = event.target.value
    cardFrontName.textContent = value == "" ? "JANE APPLESEED": value;

})

cardNumber.addEventListener("keydown", (event) => {
    event.preventDefault()
    let value = event.target.value
    let formattedValue;
    if ((Number(event.key).toString() == "NaN" && event.keyCode !== 8) || Number(event.key) == 0) {
        formattedValue = event.target.value
    } 
    else if (event.keyCode === 8) {
        formattedValue = value.substring(0, value.length - 1)
    }
    else {
        if (value.length == 4 || value.length == 9 || value.length == 14) {
            formattedValue = value.substring(0, value.length) + " " + event.key
        } else {
            formattedValue = event.target.value + event.key
        }
    }

    event.target.value = formattedValue
    let mainValue = event.target.value
    let cardNumFill = ["0", "0", "0", "0", " ", "0", "0", "0", "0", " ", "0", "0", "0", "0", " ", "0", "0", "0", "0"]
    for (let i = 0; i < mainValue.length; i++) {
        cardNumFill[i] = mainValue[i]
    }
    cardFrontNum.textContent = cardNumFill.join("") 
});

cardExpMonth.addEventListener("input", (event) => {
    let month = cardFrontExpiry.textContent.split("/")[0]
    let year = cardFrontExpiry.textContent.split("/")[1]

    month = event.target.value
    cardFrontExpiry.textContent = month + "/" + year
    cardFrontExpiry.textContent = event.target.value == "" ? "00/" + cardFrontExpiry.textContent.split("/")[1]: event.target.value + "/" + cardFrontExpiry.textContent.split("/")[1]
})

cardExpYear.addEventListener("input", (event) => {
    let month = cardFrontExpiry.textContent.split("/")[0]
    let year = cardFrontExpiry.textContent.split("/")[1]

    year = event.target.value
    cardFrontExpiry.textContent = month + "/" + year
    cardFrontExpiry.textContent = event.target.value == "" ? cardFrontExpiry.textContent.split("/")[0] + "/00": cardFrontExpiry.textContent.split("/")[0] + "/" + event.target.value
})

csv.addEventListener("input", (event) => {
    cardBackCSV.textContent = event.target.value == "" ? "000": event.target.value
})


function checkCardName () {
    if (cardName.validity.valueMissing) {
        nameErr.textContent = "This field is required"
        cardName.classList.add("error-border")
        return false
    }
    nameErr.textContent = ""
    cardName.classList.remove("error-border")
    return true
}


function checkCardNumber() {
    if (cardNumber.validity.valueMissing) {
        numberErr.textContent = "This field is required"
        cardNumber.classList.add("error-border")
        return false
    }else if (cardNumber.value.split(" ").join("").length != 16) {
        numberErr.textContent = "This is an invalid card number"
        cardNumber.classList.add("error-border")
        return false
    }
    numberErr.textContent = ""
    cardNumber.classList.remove("error-border")
    return true
}


function checkExpiry () {
    let now = new Date()
    let year = Number(now.getFullYear().toString().slice(-2))
    if (cardExpMonth.validity.valueMissing || cardExpYear.validity.valueMissing) {
        expiryErr.textContent = "This fields are required"
        if (cardExpMonth.value == "") {
            cardExpMonth.classList.add("error-border")
        }
        if (cardExpYear.value == ""){
            cardExpYear.classList.add("error-border")
        }
        return false
    } else if (Number(cardExpMonth.value) > 12 || Number(cardExpMonth.value) < 1) {
        expiryErr.textContent = "This field is invalid"
        cardExpMonth.classList.add("error-border")
        return false
    } else if (Number(cardExpYear.value) < year || Number(cardExpYear.value) > year + 6) {
        expiryErr.textContent = "This field is invalid"
        cardExpYear.classList.add("error-border")
        return false
    }
    cardExpMonth.classList.remove("error-border")
    cardExpYear.classList.remove("error-border")
    expiryErr.textContent = ""
    return true
}


function checkCSV () {
    if (csv.validity.valueMissing) {
        csvErr.textContent = "This field is required"
        csv.classList.add("error-border")
        return false
    } else if (csv.value.length < 3) {
        csvErr.textContent = "This field is invalid"
        csv.classList.add("error-border")
        return false
    }
    csvErr.textContent = ""
    csv.classList.remove("error-border")
    return true
}




document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
    let nameState = checkCardName()
    let numberState = checkCardNumber()
    let expState = checkExpiry()
    let csvExp = checkCSV()

    if (nameState && numberState && expState && csvExp) {
        document.querySelector("form").style.display = "None"
        document.querySelector("#success").style.display = "block"
    }
    
})

document.querySelector("#success button").addEventListener("click", () => {
    window.location.reload()
})
