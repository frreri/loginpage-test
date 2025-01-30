"use strict";

// JavaScript was not required in the task, but I added some for fun.

const mainContainer = document.querySelector(".main-container");
const loginWindow = document.querySelector(".sections-container");
const loginForm = document.querySelector(".login-form");
const userEmail = document.querySelector("#user-email");
const userPassword = document.querySelector("#user-pw");

// I add an eventlistener to the form that overwrites the default submit behavior
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

// To give the effect of the welcome message being typed out, I wrote this recursive function that takes an array of characters to write
// (it also takes the element to write to, and optionally a current text which is used when it is called recursively)
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

// It felt wrong to not have the register button do anything, so i practiced IIFE and closure
(() => {
  let count = 0;
  document.querySelector(".register-btn").addEventListener("click", (e) => {
    e.preventDefault();
    alert(`Click ${++count}`);
  });
})();
