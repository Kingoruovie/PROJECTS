"use strict";
const hamburgerBtn = document.querySelector(".hamburger button");
const closeBtn = document.querySelector("nav .close");
const nav = document.querySelector("header nav");
hamburgerBtn === null || hamburgerBtn === void 0 ? void 0 : hamburgerBtn.addEventListener("click", () => {
    nav === null || nav === void 0 ? void 0 : nav.classList.remove("translate-x-[100vw]");
});
closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener("click", () => {
    nav === null || nav === void 0 ? void 0 : nav.classList.add("translate-x-[100vw]");
});
