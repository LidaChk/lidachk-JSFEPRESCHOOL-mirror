/*  import i18Obj from './js/translate.js';
console.log(i18Obj.en); */

const i18Obj = {
  'en': {
    'skills': 'Skills',
    'portfolio': 'Portfolio',
    'video': 'Video',
    'price': 'Price',
    'contacts': 'Contacts',
    'hero-title': 'Alexa Rise',
    'hero-text': 'Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise',
    'hire': 'Hire me',
    'skill-title-1': 'Digital photography',
    'skill-text-1': 'High-quality photos in the studio and on the nature',
    'skill-title-2': 'Video shooting',
    'skill-text-2': 'Capture your moments so that they always stay with you',
    'skill-title-3': 'Rotouch',
    'skill-text-3': 'I strive to make photography surpass reality',
    'skill-title-4': 'Audio',
    'skill-text-4': 'Professional sounds recording for video, advertising, portfolio',
    'winter': 'Winter',
    'spring': 'Spring',
    'summer': 'Summer',
    'autumn': 'Autumn',
    'price-description-1-span-1': 'One location',
    'price-description-1-span-2': '120 photos in color',
    'price-description-1-span-3': '12 photos in retouch',
    'price-description-1-span-4': 'Readiness 2-3 weeks',
    'price-description-1-span-5': 'Make up, visage',
    'price-description-2-span-1': 'One or two locations',
    'price-description-2-span-2': '200 photos in color',
    'price-description-2-span-3': '20 photos in retouch',
    'price-description-2-span-4': 'Readiness 1-2 weeks',
    'price-description-2-span-5': 'Make up, visage',
    'price-description-3-span-1': 'Three locations or more',
    'price-description-3-span-2': '300 photos in color',
    'price-description-3-span-3': '50 photos in retouch',
    'price-description-3-span-4': 'Readiness 1 week',
    'price-description-3-span-5': 'Make up, visage, hairstyle',
    'order': 'Order shooting',
    'contact-me': 'Contact me',
    'send-message': 'Send message'
  },
  'ru': {
    'skills': 'Навыки',
    'portfolio': 'Портфолио',
    'video': 'Видео',
    'price': 'Цены',
    'contacts': 'Контакты',
    'hero-title': 'Алекса Райс',
    'hero-text': 'Сохраните искренние эмоции, романтические переживания и счастливые моменты жизни вместе с профессиональным фотографом',
    'hire': 'Пригласить',
    'skill-title-1': 'Фотография',
    'skill-text-1': 'Высококачественные фото в студии и на природе',
    'skill-title-2': 'Видеосъемка',
    'skill-text-2': 'Запечатлите лучшие моменты, чтобы они всегда оставались с вами',
    'skill-title-3': 'Ретушь',
    'skill-text-3': 'Я стремлюсь к тому, чтобы фотография превосходила реальность',
    'skill-title-4': 'Звук',
    'skill-text-4': 'Профессиональная запись звука для видео, рекламы, портфолио',
    'winter': 'Зима',
    'spring': 'Весна',
    'summer': 'Лето',
    'autumn': 'Осень',
    'price-description-1-span-1': 'Одна локация',
    'price-description-1-span-2': '120 цветных фото',
    'price-description-1-span-3': '12 отретушированных фото',
    'price-description-1-span-4': 'Готовность через 2-3 недели',
    'price-description-1-span-5': 'Макияж, визаж',
    'price-description-2-span-1': 'Одна-две локации',
    'price-description-2-span-2': '200 цветных фото',
    'price-description-2-span-3': '20 отретушированных фото',
    'price-description-2-span-4': 'Готовность через 1-2 недели',
    'price-description-2-span-5': 'Макияж, визаж',
    'price-description-3-span-1': 'Три локации и больше',
    'price-description-3-span-2': '300 цветных фото',
    'price-description-3-span-3': '50 отретушированных фото',
    'price-description-3-span-4': 'Готовность через 1 неделю',
    'price-description-3-span-5': 'Макияж, визаж, прическа',
    'order': 'Заказать съемку',
    'contact-me': 'Написать мне',
    'send-message': 'Отправить'
  }
}
// Theme Loader&Switcher

if (!localStorage.getItem('data-theme')) localStorage.setItem('data-theme', 'dark');
document.documentElement.setAttribute("data-theme", localStorage.getItem('data-theme'));

function switchTheme() {
  localStorage.setItem('data-theme', (localStorage.getItem('data-theme') == 'dark') ? 'light' : 'dark');
  document.documentElement.setAttribute("data-theme", localStorage.getItem('data-theme'));
  return true;
}

//--------------------
// Season switcher and creator


if (!localStorage.getItem('cur-season')) localStorage.setItem('cur-season', 'autumn');

const aSeasons = ['winter', 'spring', 'summer', 'autumn'];
const PfImgCount = 6;
const sImgFolder = './assets/img/';

/* function CreatePfItem(n) {
  let li = document.createElement('li');
  li.classList.add('portfolio_item');
  aSeasons.forEach(s => {
    let img = document.createElement('img');
    img.classList.add(s);
    img.classList.add('pf_img');
    img.alt = s + ' ' +1;
    img.src = sImgFolder + s + '/' + n + '.jpg';
    
    li.appendChild(img);
  });
  return  li;
}

function CreatePfList(element)
{
  for(let i =1; i <= PfImgCount; i ++){
    element.appendChild(CreatePfItem(i))
  }
}  */

function setSeason(sSeason) {
  document.querySelectorAll('.pf_img.active').forEach(e => e.classList.remove('active'));
  document.querySelectorAll('.pf_img.' + sSeason).forEach(e => e.classList.add('active'));
  localStorage.setItem('cur-season', sSeason);
  document.querySelectorAll('button').
  forEach(b => {
    if (b.dataset.season == sSeason) b.classList.add('btn_active')
  });
}

function changeSeason(event) {
  element = event.target;
  if (element.type == 'button') {
    document.querySelector('.portfolio_btns_lst').querySelectorAll('button').
    forEach(b => b.classList.remove('btn_active'));
    setSeason(element.dataset.season);
  }
}

//------------------------------------



window.onload = function () {

  /*   CreatePfList(document.querySelector('.portfolio_items_img')); */ 
  
  setSeason(localStorage.getItem('cur-season'));
  //Language utils
  
  if (!localStorage.getItem('cur-lang')) localStorage.setItem('cur-lang', 'en');

  function langSwitcher(to) {
    const walker = document.createTreeWalker(document.body,  NodeFilter.SHOW_TEXT);
    let from =  (to == 'ru')? 'en' : 'ru';
    console.log(from, ' => ' ,to);
    while (walker.nextNode()) {
      let text = walker.currentNode.textContent.trim();      
      for (let [key, value] of Object.entries(i18Obj[from])) {
        if (text === value.trim()) {
          walker.currentNode.textContent = i18Obj[to][key];
        }
      }
    }
    document.querySelectorAll("a.language__link").forEach( el => el.classList.toggle('switch_on'));
    localStorage.setItem('cur-lang', to);
  }
  if (localStorage.getItem('cur-lang') == 'ru') langSwitcher('ru');
  document.querySelector('body').style.opacity = 1

  
  document.querySelectorAll("a.language__link").forEach(element =>
    element.addEventListener("click", function langSwitch() {
      if (!this.classList.contains('switch_on')) {
        switchTo = this.innerText.toLocaleLowerCase();
        langSwitcher(switchTo);
      }
      return false;
    }));






  document.querySelector('div.theme__switch').addEventListener('click', switchTheme);
  document.querySelector('.portfolio_btns_lst').addEventListener('click', changeSeason)



//NavBar Utils
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
//---------------------------------------------------------------

};