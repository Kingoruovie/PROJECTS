const rangeInput = document.querySelector("input[type='range']");
const checkInput = document.querySelector("input[type='checkbox']");
const pageViews = document.querySelector("main > div > div p span:nth-child(1)")
const pricing = document.querySelector("main > div > div div span:nth-child(1)")
const pricingObj = {
    "25": [8, "10k"],
    "50": [16, "100k"],
    "75": [24, "500k"],
    "100": [32, "1m"]
}
let disocunt = false

function makeRangeProgress(percent=50) {
    const priceArr = pricingObj[`${percent}`]
    let price = priceArr[0]
    if (disocunt) {
        price = priceArr[0] - priceArr[0] * 0.25
    }
    rangeInput.value = percent
    rangeInput.style.background = `linear-gradient(to right, hsl(174, 77%, 80%) ${percent}%, hsl(224, 65%, 95%) ${percent}%)`
    pageViews.textContent = priceArr[1]
    pricing.textContent = `$${price}.00`
}

checkInput.addEventListener("input", () => {
    if (checkInput.value == "false") {
        checkInput.value = "true"
        disocunt = true
    }
    else {
        checkInput.value = "false"
        disocunt = false
    }
    makeRangeProgress(Number(rangeInput.value))
})

makeRangeProgress()
rangeInput.addEventListener("input", (event) => {
    let percent = Number(event.target.value)
    if (percent % 25 == 0 && percent == 0) {
        percent = 25
    } else if (percent % 25 != 0) {
        percent = percent - (percent % 25) + 25
    }
    makeRangeProgress(percent)
})