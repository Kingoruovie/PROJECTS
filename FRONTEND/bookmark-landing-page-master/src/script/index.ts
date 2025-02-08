const hamburgerBtn = document.querySelector(".hamburger button");
const closeBtn = document.querySelector("nav .close");
const nav = document.querySelector("header nav");

hamburgerBtn?.addEventListener("click", () => {
  nav?.classList.remove("translate-x-[100vw]");
})

closeBtn?.addEventListener("click", () => {
  nav?.classList.add("translate-x-[100vw]")
})


