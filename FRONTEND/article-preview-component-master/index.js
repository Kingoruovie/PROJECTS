const share = document.querySelector("article.share")

share.addEventListener("click", () => {
    const shareCont = document.querySelector(".share-container");
    if (shareCont.style.display === "none") {
        shareCont.style.display = "block";
        share.classList.add("active");
    }
    else {
        shareCont.style.display = "none";
        share.classList.remove("active")
    }
})