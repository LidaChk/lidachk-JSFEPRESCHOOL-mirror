// Theme Loader&Switcher

if(!localStorage.getItem('data-theme')) localStorage.setItem('data-theme', 'dark');
document.documentElement.setAttribute("data-theme", localStorage.getItem('data-theme'));
function switchTheme() {
    localStorage.setItem('data-theme', (localStorage.getItem('data-theme') == 'dark')? 'light' : 'dark');
    document.documentElement.setAttribute("data-theme", localStorage.getItem('data-theme'));
    return true;
}

//--------------------

window.onload = function () {

  document.querySelector('div.theme__switch').addEventListener("click", switchTheme);

  
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



  function OpenNavBar() {

    arrTabletItems = ['.navburger__wrapper', '.header__container', '.burger_container', 'h2', '.wrapper', '.video_player', 'form__contacts', '.hero__content_box', '.form__contacts', '.skills', '.navigation__link']

    arrTabletItems.forEach(x => document.querySelectorAll(x).forEach(el => el.classList.toggle('tablet_navbar')));


    document.querySelector('.navigation').classList.add('tablet_navbar');
    setTimeout(function () {
      document.querySelector('.navigation').classList.add('big_navbar');
      return true;
    }, 300);
    return true;

  }

  function CloseNavBar() {

    document.querySelector('.navigation').classList.toggle('big_navbar_off');
    setTimeout(function () {

      document.querySelectorAll('.big_navbar').forEach(x => x.classList.remove('big_navbar'));
      document.querySelectorAll('.tablet_navbar').forEach(x => x.classList.remove('tablet_navbar'));
      document.querySelector('.navigation').classList.toggle('big_navbar_off');

    }, 400);
    return true;

  }


  document.querySelectorAll('.navigation__link').forEach(e => e.addEventListener('click', function () {

    if (document.querySelector('.burger_container')) document.querySelector('.burger_container').classList.toggle('change');
    CloseNavBar();
    return true;
  }));


  document.querySelector('.burger_container').addEventListener('click', function () {
    document.querySelector('.burger_container').classList.toggle('change');
    if (!document.querySelector('.big_navbar')) {
      OpenNavBar();
    } else {
      CloseNavBar();

    }
    return true;
  });
};