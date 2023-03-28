const counterBoxesElement = document.querySelector(".counter-boxes");
const cnterBxMobileElement = document.querySelector(".counter-boxes-mobile");
const rouletteElement = document.querySelector(".roulette");
const boxElements = document.querySelectorAll(".box-roulette");
const spinButton = document.querySelector("#spin-btn");
const styleHoverBox = document.querySelector("#style-hover-box");
const buttonMenuMobile = document.querySelector(".mobile-menu");
const menuMobile = document.querySelector(".phone-navigation-menu");
const counterInMbMenuBtn = document.querySelector(".counter-boxes-mobile-menu");
const htmlElement = document.documentElement;
const dataStyle_1 = styleHoverBox.innerHTML;

const mediaQuery750 = window.matchMedia("(min-width: 750px)");
const timeAnimation = 25;
let counterBox = 0;
let notificationMobile = 0;
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
buttonMenuMobile.addEventListener("click", () => {
  notificationMobile = 0;
  counterInMbMenuBtn.style.display = "none";
  counterInMbMenuBtn.innerText = notificationMobile;
  menuMobile.classList.toggle("visible-menu");
  htmlElement.classList.toggle("no-overflowY");
});
spinButton.addEventListener("click", () => {
  styleHoverBox.innerHTML = "";
  spinButton.style.display = "none";
  percentComplete = 0;

  const ChooseBox = setInterval(() => {
    boxElements.forEach((box) => (box.style.filter = "brightness(30%)"));
    boxChosen = boxElements[randBox(4)];
    boxChosen.style.filter = "brightness(100%)";
  }, 200);

  const animationSpin = setInterval(() => {
    percentComplete += fpp;
    rouletteElement.style.backgroundImage = `linear-gradient(90deg, #333 ${percentComplete}%, var(--roulette-color) 0%)`;
    if (percentComplete >= 100) {
      spinButton.style.display = "flex";
      clearInterval(ChooseBox);
      clearInterval(animationSpin);
      styleHoverBox.innerHTML = dataStyle_1;
      console.log(styleHoverBox.innerHTML);
      if (counterBox === 0) {
        counterBoxesElement.style.backgroundColor = "var(--boxes-color)";
        cnterBxMobileElement.style.backgroundColor = "var(--boxes-color)";
      }
      counterBox++;
      notificationMobile++;
      if (notificationMobile == 1) {
        counterInMbMenuBtn.style.display = "flex";
      }
      counterInMbMenuBtn.innerText = notificationMobile;
      counterBoxesElement.innerText = counterBox;
      cnterBxMobileElement.innerText = counterBox;
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
