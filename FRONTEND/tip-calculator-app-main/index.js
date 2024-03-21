const bill = document.querySelector("#bill")
const tipsList = document.querySelectorAll(".tip")
const customTip = document.querySelector(".tips input")
const people = document.querySelector(".people input")
const error =  document.querySelector(".error")
const tipAmount = document.querySelector(".amount-per-person .amount")
const totalAmount = document.querySelector(".total-per-person .amount")
const button =document.querySelector("button")

button.addEventListener("click", () => {
    tipAmount.textContent = "$0.00"
    totalAmount.textContent = "$0.00"
    bill.value = ""
    if (document.querySelector(".active")) {
        document.querySelector(".active").classList.remove("active")
    }
    customTip.value = ""
    people.value = ""
    button.disabled = true
})


function calculateTip() {
    let tip;
    if (customTip.value == "" || customTip.value == "0" || Number(customTip.value) < 0) {
        if (document.querySelector(".active")) {
            tip = document.querySelector(".active").dataset.value
        } else {
            tip = 0
        }
    } else {
        tip = Number(customTip.value)
    }
    let billAmount = Number(bill.value) < 0 ? 0: Number(bill.value);
    let Numberpeople = Number(people.value) <= 0 ? 0: Number(people.value) 

    if (Numberpeople != 0) {
        let tipPerPerson = ((billAmount * (tip / 100)) / Numberpeople).toFixed(2)
        let totalPerPerson = ((billAmount / Numberpeople) + Number(tipPerPerson)).toFixed(2)
        
        tipAmount.textContent = `$${tipPerPerson}`
        totalAmount.textContent = `$${totalPerPerson}`

        button.disabled = false
    }
}

bill.addEventListener("input", () => {
    calculateTip()
})

tipsList.forEach(tip => {
    tip.addEventListener("click", () => {
        if (document.querySelector(".active")) {
            document.querySelector(".active").classList.remove("active")
        }
        tip.classList.add("active")
        customTip.value = ""
        calculateTip()
    })
});

customTip.addEventListener("input", () => {
    if (Number(customTip.value) > 0) {
        if (document.querySelector(".active")) {
            document.querySelector(".active").classList.remove("active")
        }
    }
    calculateTip()
})

people.addEventListener("input", (event) => {
    if (event.target.value == "0") {
        error.style.display = "block"
        people.classList.add("error-outline")
    } else {
        error.style.display = null
        event.target.classList.remove("error-outline")
    }
    calculateTip()
})