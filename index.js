const counterBoxesElement = document.querySelector(".counter-boxes");
const cnterBxMobileElement = document.querySelector(".counter-boxes-mobile");
const btnBoxMenu = document.querySelector(".button-box");
const btnBoxMenuMobile = document.querySelector(".button-box.mobile-button");
const boxMenuElement = document.querySelector(".box-menu");
const rouletteElement = document.querySelector(".roulette");
const noBoxMessageElement = document.querySelector(".no-box-message");
const boxElements = document.querySelectorAll(".box-roulette");
const spinButton = document.querySelector("#spin-btn");
const styleHoverBox = document.querySelector("#style-hover-box");
const btnMenuMobile = document.querySelector(".mobile-menu");
const menuMobile = document.querySelector(".phone-navigation-menu");
const btnCounterInMbMenu = document.querySelector(".counter-boxes-mobile-menu");
const htmlElement = document.documentElement;
const dataStyle_1 = styleHoverBox.innerHTML;

const mediaQuery750 = window.matchMedia("(min-width: 450px)");
const timeAnimation = 25;
let numberBox = 0;
let notificationMobile = 0;
let notificationBoxMenu = 0;
let fpp = 0.5;
let boxChosen;
let percentComplete = 0;

function randBox(number) {
  return Math.floor(Math.random() * number);
}
mediaQuery750.addEventListener("change", (e) => {
  if (e.matches) {
    menuMobile.classList.remove("visible-menu");
    htmlElement.classList.remove("no-overflowY");
  }
});
btnMenuMobile.addEventListener("click", () => {
  notificationBoxMenu = 0;
  btnCounterInMbMenu.style.display = "none";
  btnCounterInMbMenu.innerText = 0;
  if (!boxMenuElement.classList.contains("mobile-version-menu")) {
    menuMobile.classList.toggle("visible-menu");
  }
  boxMenuElement.classList.remove("mobile-version-menu");
});
function updateBoxMenu() {
  if (!noBoxMessageElement) {
    const lastBoxElement = document.querySelector(".box-element:last-child");
    lastBoxElement.scrollIntoView({ behavior: "smooth" });
  }
  notificationBoxMenu = 0;
  
  counterBoxesElement.innerText = notificationBoxMenu;
  cnterBxMobileElement.innerText = notificationBoxMenu;
  counterBoxesElement.style.backgroundColor = "var(--no-boxes-color)";
  cnterBxMobileElement.style.backgroundColor = "var(--no-boxes-color)";
}
btnBoxMenuMobile.addEventListener("click", () => {
  updateBoxMenu();
  boxMenuElement.classList.toggle("mobile-version-menu");
  boxMenuElement.classList.remove("computer-version-box-menu")
  menuMobile.classList.remove("visible-menu");
});
btnBoxMenu.addEventListener("click", () => {
  updateBoxMenu();
  boxMenuElement.classList.remove("mobile-version-menu");
  boxMenuElement.classList.add("computer-version-box-menu");
  boxMenuElement.classList.toggle("flex-display");
});

const dataBoxes = {
  image: ["svg/music.svg", "svg/game.svg", "svg/film.svg", "svg/general.svg"],
  title: ["Music", "Game", "Film", "General"],
};
function DataBoxChosen(nBox) {
  numberBox++;
  if (numberBox == 1) {
    noBoxMessageElement.remove();
  }
  let titleBox = `${dataBoxes.title[nBox]} Title Box`;

  let boxElement = document.createElement("div");
  let numberBoxElement = document.createElement("span");
  let titleBoxElement = document.createElement("span");
  let imageBoxElement = document.createElement("img");
  boxElement.classList.add("box-element");
  titleBoxElement.classList.add("box-title");
  numberBoxElement.classList.add("number-box");
  titleBoxElement.innerText = titleBox;

  numberBoxElement.innerText = numberBox;

  imageBoxElement.src = dataBoxes.image[nBox];
  boxMenuElement.appendChild(boxElement);
  boxElement.append(numberBoxElement, titleBoxElement, imageBoxElement);
}

let choosenNumber;
spinButton.addEventListener("click", () => {
  boxMenuElement.classList.remove("flex-display");
  styleHoverBox.innerHTML = "";
  spinButton.style.display = "none";
  percentComplete = 0;
  const ChooseBox = setInterval(() => {
    boxElements.forEach((box) => (box.style.filter = "brightness(30%)"));
    choosenNumber = randBox(4);
    boxChosen = boxElements[choosenNumber];
    boxChosen.style.filter = "brightness(100%)";
  }, 200);
  const animationSpin = setInterval(() => {
    percentComplete += fpp;
    rouletteElement.style.backgroundImage = `linear-gradient(90deg, #333 ${percentComplete}%, var(--roulette-color) 0%)`;
    if (percentComplete >= 100) {
      DataBoxChosen(choosenNumber);
      spinButton.style.display = "flex";
      clearInterval(ChooseBox);
      clearInterval(animationSpin);
      styleHoverBox.innerHTML = dataStyle_1;
      if (!boxMenuElement.classList.contains("flex-display")) {
        if (notificationBoxMenu === 0) {
          counterBoxesElement.style.backgroundColor = "var(--boxes-color)";
          cnterBxMobileElement.style.backgroundColor = "var(--boxes-color)";
        }
        notificationMobile++;
        notificationBoxMenu++;
      }

      if (notificationMobile == 1) {
        btnCounterInMbMenu.style.display = "flex";
      }
      btnCounterInMbMenu.innerText = notificationMobile;
      counterBoxesElement.innerText = notificationBoxMenu;
      cnterBxMobileElement.innerText = notificationBoxMenu;
      const reverseAnimation = setInterval(() => {
        percentComplete -= fpp;
        rouletteElement.style.backgroundImage = `linear-gradient(90deg, #333 ${percentComplete}%, var(--roulette-color) 0%)`;
        if (percentComplete <= 0) {
          percentComplete = 0;
          boxElements.forEach((box) => (box.style.filter = "brightness(70%)"));
          clearInterval(reverseAnimation);
        }
      }, timeAnimation / 2);
    }
  }, timeAnimation);
});
