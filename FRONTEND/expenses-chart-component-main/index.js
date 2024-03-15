const amounts = document.querySelectorAll("span.stat-detail__amount")
const bars = document.querySelectorAll("span.stat-detail__bar")
const days = document.querySelectorAll("span.stat-detail__day")

async function readLocalJSON (filePath) {
    const response = await fetch(filePath)
    if (!response.ok) {
        throw new Error(`Error fetching JSON file: ${filePath}`)
    }
    const data = await response.json()
    return data
}

readLocalJSON('data.json').then(data => {
    let max = 0;
    let maxIndex;
    for (let i=0; i<=6; i++) {
        let amount = data[i]["amount"]
        let barElement = bars[i]
        let amountElement = amounts[i]
        

        barElement.style.height = `${amount * 3}px`
        barElement.classList.add("bar-normal")
        amountElement.textContent = `$${amount}`
        amountElement.style.bottom = `${amount * 3 + 25 }px`

        if (amount > max) {
            max = amount
            maxIndex = i
        }

    }
    bars[maxIndex].classList.remove("bar-normal")
    bars[maxIndex].classList.add("bar-max")
}).catch(error => {
    console.error(error)
})


bars.forEach((bar) => {
    bar.addEventListener("mouseover", () => {
        bar.previousElementSibling.style.display = "block"
    })
})

bars.forEach((bar) => {
    bar.addEventListener("mouseout", () => {
        bar.previousElementSibling.style.display = "none"
    })
})