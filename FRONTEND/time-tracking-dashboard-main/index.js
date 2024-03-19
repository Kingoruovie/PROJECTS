async function fetchTimeData (filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error("File does not exist")
    }
    return response.json()
}

function updateTimeData(event = null) {
    const timeFrame = event != null ? event.target.textContent.toLowerCase(): "weekly";
    const details = document.querySelectorAll(".detail")
    
    if (event!= null) {
        document.querySelector(".active").classList.remove("active")
        event.target.classList.add("active")
    }
    fetchTimeData("data.json").then( data => {
        console.log(data)
        for (let i = 0; i < 6; i++) {
            const currentTime = details[i].querySelector("h3.hours")
            const previousTime = details[i].querySelector(".last-time")
            const timeGroup = details[i].querySelector(".time-group")
            
            let current = data[i]["timeframes"][timeFrame]["current"] 
            let previous = data[i]["timeframes"][timeFrame]["previous"]
            current = current > 1 ? `${current}hrs`: `${current}hr`
            previous = previous > 1 ? `${previous}hrs`: `${previous}hr`
            currentTime.textContent = current
            previousTime.textContent = previous
            timeGroup.textContent = timeFrame == "daily" ? "Last Day": timeFrame == "weekly"? "Last Week" : "Last Month"
        }
    }).catch (error => console.log(error))
}

updateTimeData()

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", updateTimeData)
})
