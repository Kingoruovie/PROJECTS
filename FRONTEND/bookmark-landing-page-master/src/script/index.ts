const hamburgerBtn = document.querySelector(".hamburger button");
const closeBtn = document.querySelector("nav .close");
const nav = document.querySelector("header nav");
const tabBtns = document.querySelectorAll("#features div.tab-btns button");
const accordionBtns = document.querySelectorAll(".accordion-item button");
const email = document.querySelector("form input[type='email']") as HTMLInputElement;
const form = document.querySelector("form");
const formDiv = form?.querySelector("div")
const span = form?.querySelector("span")
const error = form?.querySelector("img")


hamburgerBtn?.addEventListener("click", () => {
  nav?.classList.remove("translate-x-[100vw]");
})

closeBtn?.addEventListener("click", () => {
  nav?.classList.add("translate-x-[100vw]")
})

tabBtns.forEach(function(tabBtn) {
  tabBtn.addEventListener("click", function() {
    const id = tabBtn.id;
    const activeTab = document.querySelector(".active-tab");
    const tab = document.querySelector(`.${id}`);
    const activeBtn = document.querySelector(".active-btn");
    activeBtn?.classList.remove("active-btn");
    tabBtn.classList.add("active-btn");
    activeTab?.classList.replace("active-tab", "hidden")
    tab?.classList.replace("hidden", "active-tab")
  })
})

accordionBtns.forEach(function(accordionBtn) {
  accordionBtn.addEventListener("click", function() {
    const accordion = accordionBtn.parentNode?.parentNode
    const answer = accordion?.querySelector(".answer");
    answer?.classList.toggle("h-0");
  })
})

function showError() {
  if (email.validity.valueMissing || email.validity.typeMismatch) {
    span?.classList.replace("hidden", "block");
    error?.classList.remove("hidden");
    formDiv?.classList.add("bg-soft-red")
  } else {
    email.value = ""
    span?.classList.replace("block", "hidden");
    error?.classList.add("hidden");
    formDiv?.classList.remove("bg-soft-red")
  }
}

form?.addEventListener("submit", function(event) {
  event.preventDefault()
  showError()
})
