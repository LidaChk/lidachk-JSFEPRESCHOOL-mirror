import i18Obj from "./js/translate.js";
const aOpacityItems = ["p", "h1", "h2", "h3", "a", "button", ".price__text"];

// Theme Loader&Switcher

/*  if (!localStorage.getItem('data-theme')) localStorage.setItem('data-theme', 'dark');
  document.documentElement.setAttribute("data-theme", localStorage.getItem('data-theme')); */

function switchTheme() {
  localStorage.setItem(
    "data-theme",
    localStorage.getItem("data-theme") == "dark" ? "light" : "dark"
  );
  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem("data-theme")
  );
  return true;
}

//--------------------
// Season switcher and creator

if (!localStorage.getItem("cur-season"))
  localStorage.setItem("cur-season", "autumn");

function setSeason(sSeason) {
  document
    .querySelectorAll(".pf_img.active")
    .forEach((e) => e.classList.remove("active"));
  document
    .querySelectorAll(".pf_img." + sSeason)
    .forEach((e) => e.classList.add("active"));
  localStorage.setItem("cur-season", sSeason);
  document.querySelectorAll("button").forEach((b) => {
    if (b.dataset.season == sSeason) b.classList.add("btn_active");
  });
}

function changeSeason(event) {
  let element = event.target;
  if (element.type == "button") {
    document
      .querySelector(".portfolio_btns_lst")
      .querySelectorAll("button")
      .forEach((b) => b.classList.remove("btn_active"));
    setSeason(element.dataset.season);
  }
}

//------------------------------------
function langSwitcher(to) {
  aOpacityItems.forEach((a) =>
    document.querySelectorAll(a).forEach((el) => (el.style.opacity = 0))
  );
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let from = to == "ru" ? "en" : "ru";
  /* console.log(from, ' => ', to); */
  while (walker.nextNode()) {
    let text = walker.currentNode.textContent.trim();
    for (let [key, value] of Object.entries(i18Obj[from])) {
      if (text === value.trim()) {
        walker.currentNode.textContent = i18Obj[to][key];
      }
    }
  }
  document.querySelectorAll(".form_input").forEach((el) => {
    let text = el.placeholder;
    for (let [key, value] of Object.entries(i18Obj[from])) {
      if (text === value.trim()) {
        el.placeholder = i18Obj[to][key];
      }
    }
  });
  aOpacityItems.forEach((a) =>
    document.querySelectorAll(a).forEach((el) => (el.style.opacity = 1))
  );
  document
    .querySelectorAll("a.language__link")
    .forEach((el) => el.classList.toggle("switch_on"));

  localStorage.setItem("cur-lang", to);
}

window.onload = function () {
  setSeason(localStorage.getItem("cur-season"));
  //Language utils

  if (!localStorage.getItem("cur-lang")) localStorage.setItem("cur-lang", "en");
  if (localStorage.getItem("cur-lang") == "ru") langSwitcher("ru");

  aOpacityItems.forEach((a) =>
    document.querySelectorAll(a).forEach((el) => (el.style.opacity = 1))
  );

  document.querySelectorAll("a.language__link").forEach((element) =>
    element.addEventListener("click", function langSwitch() {
      if (!this.classList.contains("switch_on")) {
        let switchTo = this.innerText.toLocaleLowerCase();
        langSwitcher(switchTo);
      }
      return false;
    })
  );

  document
    .querySelector("div.theme__switch")
    .addEventListener("click", switchTheme);
  document
    .querySelector(".portfolio_btns_lst")
    .addEventListener("click", changeSeason);

  //NavBar Utils
  function OpenNavBar() {
    let arrTabletItems = [
      ".navburger__wrapper",
      ".header__container",
      ".burger_container",
      "h2",
      ".wrapper",
      ".video_player",
      "form__contacts",
      ".hero__content_box",
      ".form__contacts",
      ".skills",
      ".navigation__link",
      ".btn_basic",
      ".container",
    ];

    arrTabletItems.forEach((x) =>
      document
        .querySelectorAll(x)
        .forEach((el) => el.classList.toggle("tablet_navbar"))
    );

    document.querySelector(".navigation").classList.add("tablet_navbar");
    setTimeout(function () {
      document.querySelector(".navigation").classList.add("big_navbar");
      return true;
    }, 300);
    return true;
  }

  function CloseNavBar() {
    document.querySelector(".navigation").classList.toggle("big_navbar_off");
    setTimeout(function () {
      document
        .querySelectorAll(".big_navbar")
        .forEach((x) => x.classList.remove("big_navbar"));
      document
        .querySelectorAll(".tablet_navbar")
        .forEach((x) => x.classList.remove("tablet_navbar"));
      document.querySelector(".navigation").classList.toggle("big_navbar_off");
    }, 400);
    return true;
  }

  document.querySelectorAll(".navigation__link").forEach((e) =>
    e.addEventListener("click", function () {
      if (document.querySelector(".burger_container"))
        document.querySelector(".burger_container").classList.toggle("change");
      CloseNavBar();
      return true;
    })
  );

  document
    .querySelector(".burger_container")
    .addEventListener("click", function () {
      document.querySelector(".burger_container").classList.toggle("change");
      if (!document.querySelector(".big_navbar")) {
        OpenNavBar();
      } else {
        CloseNavBar();
      }
      return true;
    });
  //---------------------------------------------------------------
};

console.log(
  "Оценка задания:\n",
  "[x] 1. Смена изображений в секции portfolio (+25)\n",
  "[x] 2. Перевод страницы на два языка (+25)\n",
  "[x] 3. Переключение светлой и тёмной темы (+25)\n",
  "[x] 4. Дополнительный функционал (+10)\n"
);
