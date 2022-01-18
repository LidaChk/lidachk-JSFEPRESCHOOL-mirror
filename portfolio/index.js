

window.onload = function() {

  console.log("index.js");

  document.querySelectorAll("a.language__link").forEach(element =>
    element.addEventListener("click", function() {
      if (!this.classList.contains('switch_on')) {
        document.querySelector("a.language__link.switch_on").classList.remove("switch_on");
        this.classList.add("switch_on");
      }
      return true;
    }));
};

let res = 'Оценка 86\n1.Вёрстка валидная +10\n2.Вёрстка семантическая +20\n3.Вёрстка соответствует макету(частично) +24\n4.Требования к css + 12\n5.Интерактивность, реализуемая через css +20'
console.log(res);