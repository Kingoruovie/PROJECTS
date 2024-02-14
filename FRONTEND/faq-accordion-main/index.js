const showBtns = document.querySelectorAll("section > article")


showBtns.forEach((showBtn) => {
    showBtn.addEventListener("click", (event) => {
        const description = showBtn.querySelector(".description")
        if (description.style.maxHeight && showBtn.classList.contains("active")) {
            showBtn.classList.remove("active")
            showBtn.querySelector("img").src = "assets/images/icon-plus.svg"
            description.style.maxHeight = null

        } else {
            showBtn.querySelector("img").src = "assets/images/icon-minus.svg"
            showBtn.classList.add("active")
            description.style.maxHeight = description.scrollHeight + "px";
        }
    })
})