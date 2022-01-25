window.onload = function () {

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



  function BurgerToggle() {

    arrTabletItems = ['.navburger__wrapper', '.header__container', '.navigation', '.navigation__link', '.burger_container', 'h2','.wrapper', '.video_player', 'form__contacts', '.hero__content_box', '.logo'];

    arrTabletItems.forEach(x => document.querySelectorAll(x).forEach(el => el.classList.toggle('tablet_navbar')));

  }


  document.querySelector('.navigation__link').addEventListener('click', function () {

    if (document.querySelector('.tablet_navbar.navigation__link')) {
      this.classList.toggle('change');
      BurgerToggle()
      
    }
  });


  document.querySelector('.burger_container').addEventListener('click', function () {
    this.classList.toggle('change');
    BurgerToggle();
  });
};