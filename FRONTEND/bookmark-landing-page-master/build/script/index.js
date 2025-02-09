"use strict";
const hamburgerBtn = document.querySelector(".hamburger button");
const closeBtn = document.querySelector("nav .close");
const nav = document.querySelector("header nav");
const tabBtns = document.querySelectorAll("#features div.tab-btns button");
const accordionBtns = document.querySelectorAll(".accordion-item button");
const email = document.querySelector("form input[type='email']");
const form = document.querySelector("form");
const formDiv = form === null || form === void 0 ? void 0 : form.querySelector("div");
const span = form === null || form === void 0 ? void 0 : form.querySelector("span");
const error = form === null || form === void 0 ? void 0 : form.querySelector("img");
hamburgerBtn === null || hamburgerBtn === void 0 ? void 0 : hamburgerBtn.addEventListener("click", () => {
    nav === null || nav === void 0 ? void 0 : nav.classList.remove("translate-x-[100vw]");
});
closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener("click", () => {
    nav === null || nav === void 0 ? void 0 : nav.classList.add("translate-x-[100vw]");
});
tabBtns.forEach(function (tabBtn) {
    tabBtn.addEventListener("click", function () {
        const id = tabBtn.id;
        const activeTab = document.querySelector(".active-tab");
        const tab = document.querySelector(`.${id}`);
        const activeBtn = document.querySelector(".active-btn");
        activeBtn === null || activeBtn === void 0 ? void 0 : activeBtn.classList.remove("active-btn");
        tabBtn.classList.add("active-btn");
        activeTab === null || activeTab === void 0 ? void 0 : activeTab.classList.replace("active-tab", "hidden");
        tab === null || tab === void 0 ? void 0 : tab.classList.replace("hidden", "active-tab");
    });
});
accordionBtns.forEach(function (accordionBtn) {
    accordionBtn.addEventListener("click", function () {
        var _a;
        const accordion = (_a = accordionBtn.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode;
        const answer = accordion === null || accordion === void 0 ? void 0 : accordion.querySelector(".answer");
        answer === null || answer === void 0 ? void 0 : answer.classList.toggle("h-0");
    });
});
function showError() {
    if (email.validity.valueMissing || email.validity.typeMismatch) {
        span === null || span === void 0 ? void 0 : span.classList.replace("hidden", "block");
        error === null || error === void 0 ? void 0 : error.classList.remove("hidden");
        formDiv === null || formDiv === void 0 ? void 0 : formDiv.classList.add("bg-soft-red");
    }
    else {
        email.value = "";
        span === null || span === void 0 ? void 0 : span.classList.replace("block", "hidden");
        error === null || error === void 0 ? void 0 : error.classList.add("hidden");
        formDiv === null || formDiv === void 0 ? void 0 : formDiv.classList.remove("bg-soft-red");
    }
}
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (event) {
    event.preventDefault();
    showError();
});
