"use strict";

// Denna js-fil skrev jag mest för kul och för att leka lite, när man klickar logga in så fadear rutan ut och ett välkomstmeddelande skrivs (om man angivit email och pass)

const mainContainer = document.querySelector(".main-container");
const loginWindow = document.querySelector(".sections-container");
const loginForm = document.querySelector(".login-form");
const userEmail = document.querySelector("#user-email");
const userPassword = document.querySelector("#user-pw");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = userEmail.value;
  const pass = userPassword.value;

  if (email && pass) {
    loginWindow.style.opacity = 0;
    setTimeout(() => loginWindow.remove(), 700);

    const msgSpan = document.createElement("span");
    msgSpan.classList.add("welcome-msg");
    mainContainer.prepend(msgSpan);

    let name = email;
    [".", "-", "_", "@"].forEach((c) => {
      if (name.includes(c)) name = name.split(c)[0];
    });

    const msgCharArr = `Hello ${capitalizeName(name)}!`.split("");
    setTimeout(writeSlow, 1000, msgSpan, msgCharArr);
  }
});

// För att ge effekt av att medelandet skrivs på tangetbord live lägger jag till en bokstav i taget på variablen curText nedan
// Detta gör jag via recursion tills arrayen med bokstäver är tom.

const writeSlow = (el, charArr, curText = "") => {
  curText += charArr.shift();
  el.textContent = curText;
  if (charArr.length === 0) {
    setTimeout(() => (el.style.opacity = 0), 1600);
    return;
  }
  setTimeout(writeSlow, getRandomInt(180, 280), el, charArr, curText);
};

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const capitalizeName = (name) => name[0].toUpperCase() + name.slice(1);

// en iffy (IIFE) bara för kul, click event listenern får åtkomst till count via closure
(() => {
  let count = 0;
  document.querySelector(".register-btn").addEventListener("click", (e) => {
    e.preventDefault();
    alert(`Click ${++count}`);
  });
})();
