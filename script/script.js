"use strict";

// TODO: Kolla på validering av userEmail och password? Göra det i js eller kan man göra i html?
// kanske lägga validering på "step out" eller vad det heter för input-fälten

// Denna js-fil skrev jag mest för kul och för att leka lite, när man klickar logga in så fadear rutan ut och ett välkomstmeddelande skrivs
// Förmodligen mycket som skulle kunna förbättras! Jag har kommenterat mycket i denna fil för att visa hur jag tänker.

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
    // Loginrutan fadear ut då jag i css satt transition opacity (ease)
    loginWindow.style.opacity = 0;
    // Efter fade out tar jag bort elementet, en ny span tar sedan dess plats
    setTimeout(() => loginWindow.remove(), 700);

    const msgSpan = document.createElement("span");
    msgSpan.classList.add("welcome-msg");
    mainContainer.prepend(msgSpan);

    // Jag hade först gjort min loginruta för username, sen såg jag att det skulle vara email..
    // Så nedan är min lösning för att i de flesta fall ändå kunna skriva Hello NAMN!
    let name = email.split("@")[0];
    [".", "-", "_"].forEach((c) => {
      if (name.includes(c)) name = name.split(c)[0];
    });

    // Strax efter att loginrutan tagits bort skriver jag ett välkomstmeddelande till min nya span
    setTimeout(printSlow, 1000, msgSpan, `Hello ${capitalizeName(name)}!`);
  }
});

// Jag vill skriva mitt välkomstmeddelande i min span så det får effekt av att någon skriver live på ett tangetbord
// så den tar in elementet jag vill skriva textContent i, och meddelandet
const printSlow = (el, msg) => {
  // Splittar upp meddelandet i en array av characters
  const cArr = msg.split("");
  let text = "";
  // Skulle kunna gjort detta på fler sätt, men jag valde att använda recursion för att tömma min array med characters successivt,
  // (recursion i och med att nedan funktion kallar sig själv (indirekt via setTimeout i alla fall) tills arrayen är tom
  const printWait = () => {
    // Plocka ur första character från arrayen och lägg till på 'text' som sedan sätts som textContent i min span
    // Skriver alltså om hela texten varje varv men med en bokstav extra, så det ser ut som det skrivs en bokstav i taget
    text += cArr.shift();
    el.textContent = text;
    if (cArr.length === 0) {
      // När arrayen är tom sätter den att elementet jag skrivit i fadear ut med opacity 0
      setTimeout(() => (el.style.opacity = 0), 1600);
      return;
    }
    setTimeout(printWait, getRandomInt(180, 280));
  };
  printWait();
};

// funktion för random int
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

// funkion för att ge tillbaka samma sträng med första bokstav capitalized
const capitalizeName = (name) => name[0].toUpperCase() + name.slice(1);

// Jag har använt arrow functions ovan då jag gillar dem
// Jag hade också kunnat skriva dem som:
// const enFunktion = function () {}  <--- detta sätt skulle jag använt som method i ett object där man kanske behöver this-keywordet
// eller den klassiska:
// function enFunktion() {}
