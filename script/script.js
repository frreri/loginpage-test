"use strict";

// Denna js-fil skrev jag mest för kul och för att leka lite, när man klickar logga in så fadear rutan ut och ett välkomstmeddelande skrivs (om man angivit email och pass)

const mainContainer = document.querySelector(".main-container");
const loginWindow = document.querySelector(".login-form-container");
const loginBtn = document.querySelector(".login-btn");
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = userEmail.value;
  const pass = userPassword.value;

  if (email && pass) {
    loginWindow.style.opacity = 0;
    setTimeout(() => loginWindow.remove(), 700);

    const msgSpan = document.createElement("span");
    msgSpan.classList.add("welcome-msg");
    mainContainer.prepend(msgSpan);

    let name = email.split("@")[0];
    [".", "-", "_"].forEach((c) => {
      if (name.includes(c)) name = name.split(c)[0];
    });

    setTimeout(writeSlow, 1000, msgSpan, `Hello ${capitalizeName(name)}!`);
  }
});

// För att ge effekt av att medelandet skrivs på tangetbord live lägger jag till en bokstav i taget på variablen text nedan
// Detta gör jag via recursion tills arrayen med bokstäver är tom.
const writeSlow = (el, msg) => {
  const cArr = msg.split("");
  let text = "";
  const writeDelayed = () => {
    text += cArr.shift();
    el.textContent = text;
    if (cArr.length === 0) {
      setTimeout(() => (el.style.opacity = 0), 1600);
      return;
    }
    setTimeout(writeDelayed, getRandomInt(180, 280));
  };
  writeDelayed();
};

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const capitalizeName = (name) => name[0].toUpperCase() + name.slice(1);
