const hamburgerBtn = document.querySelector("header .hamburger button") as HTMLButtonElement;
const closeBtn = document.querySelector("nav li button") as HTMLButtonElement;
const nav = document.querySelector("nav");
const images = document.querySelectorAll(".cta__image picture");
const articles = document.querySelectorAll(".cta__desc article");
const previousBtn = document.querySelector(".cta__btns .previous");
const nextBtn = document.querySelector(".cta__btns .next");
let defaultSliderValue = 0

hamburgerBtn.onclick = function() {
  nav!.style.transform = "translateY(0rem)";
  nav!.classList.add("show-after");
}


closeBtn.onclick = function() {
  nav!.style.transform = "translateY(-7rem)";
  nav!.classList.remove("show-after");
}

nextBtn?.addEventListener("click", () => {
  articles[defaultSliderValue].classList.remove("show")
  images[defaultSliderValue].classList.remove("show")
  defaultSliderValue += 1;
  if (defaultSliderValue < 0) defaultSliderValue = 2
  if (defaultSliderValue > 2) defaultSliderValue = 0
  articles[defaultSliderValue].classList.add("show")
  images[defaultSliderValue].classList.add("show")
})

previousBtn?.addEventListener("click", () => {
  articles[defaultSliderValue].classList.remove("show")
  images[defaultSliderValue].classList.remove("show")
  defaultSliderValue -= 1;
  if (defaultSliderValue < 0) defaultSliderValue = 2
  if (defaultSliderValue > 2) defaultSliderValue = 0
  articles[defaultSliderValue].classList.add("show")
  images[defaultSliderValue].classList.add("show")
})
