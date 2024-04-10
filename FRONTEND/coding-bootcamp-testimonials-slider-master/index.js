const prevBtn = document.querySelector("div button:nth-child(1)");
const nextBtn = document.querySelector("div button:nth-child(2)");
const slider1 = document.querySelector("div article:nth-child(1)");
const slider2 = document.querySelector("div article:nth-child(2)");


nextBtn.addEventListener("click", () => {
    slider1.classList.add('hidden')
    slider1.classList.remove('lg:flex')
    slider2.classList.remove('hidden')
    slider2.classList.add('lg:flex')
})

prevBtn.addEventListener("click", () => {
    slider2.classList.add('hidden')
    slider2.classList.remove('lg:flex')
    slider1.classList.remove('hidden')
    slider1.classList.add('lg:flex')
})