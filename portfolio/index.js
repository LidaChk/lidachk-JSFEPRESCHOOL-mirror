

window.onload = function() {

  document.querySelectorAll("a.language__link").forEach(element =>
    element.addEventListener("click", function langSwitch() {
      if (!this.classList.contains('switch_on')) {
        document.querySelector("a.language__link.switch_on").classList.toggle("switch_on");
        this.classList.toggle("switch_on");
      }
      return false;
    }));


    document.querySelector('#portfolio').querySelectorAll('button.btn_basic').forEach(element =>
      element.addEventListener("click", function btnChangeColor() {
        if (this.classList.contains('btn_blacky')) {
          let el = document.querySelector('#portfolio').querySelector('button.btn_goldy');
          el.classList.togle('btn_blacky');
          el.classList.togle('btn_goldy');
          this.classList.togle('btn_goldy');
        }
        console.log('btnChangeColor');
        return false;
      }));
};

let res = 'Оценка 92\n1.Вёрстка валидная +10\n2.Вёрстка семантическая +20\n3.Вёрстка соответствует макету(частично) +40\n4.Требования к css + 12\n5.Интерактивность, реализуемая через css +20'
console.log(res);