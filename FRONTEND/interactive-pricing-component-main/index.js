const rangeInput = document.querySelector("input[type='range']");
const checkInput = document.querySelector("input[type='checkbox']");
let disocunt = false

function makeRangeProgress(percent=50) {
    rangeInput.classList.add("bg-gradient-to-r", "from-softCyan", `from-${percent}%`, "to-lightGrayishBlueEmpty", `to-${percent}%`)
    rangeInput.value = percent
    console.log(percent)
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
    console.log(disocunt)
})

makeRangeProgress()
rangeInput.addEventListener("input", (event) => makeRangeProgress(event.target.value))