async function getRandomQuote(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("There was an error fetching a qoute")
    }
    return response.json()
}


function updateQuote() {
    const qoute = document.querySelector("h1.quote");
    const id = document.querySelector("span.id");
    getRandomQuote("https://api.adviceslip.com/advice").then(
        (data) => {
            id.textContent = data["slip"]["id"]
            qoute.textContent = `"${data["slip"]["advice"]}"`
        }
    ).catch((error) => {
        id.textContent = null
        qoute.textContent = "404 NOT FOUND"
    })
}

updateQuote()
document.querySelector("button").addEventListener("click", updateQuote)