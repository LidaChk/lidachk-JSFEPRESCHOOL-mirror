// Theme Loader&Switcher

if(!localStorage.getItem('data-theme')) localStorage.setItem('data-theme', 'dark');
document.documentElement.setAttribute("data-theme", localStorage.getItem('data-theme'));
function switchTheme() {
    localStorage.setItem('data-theme', (localStorage.getItem('data-theme') == 'dark')? 'light' : 'dark');
    document.documentElement.setAttribute("data-theme", localStorage.getItem('data-theme'));
    return true;
}

//--------------------
// Season switcher and creator


if(!localStorage.getItem('cur-season')) localStorage.setItem('cur-season', 'autumn');

const aSeasons = ['winter', 'spring', 'summer','autumn'];
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

function setSeason(sSeason){
  document.querySelectorAll('.pf_img.active').forEach(e => e.classList.remove('active'));
  document.querySelectorAll('.pf_img.' + sSeason).forEach(e => e.classList.add('active'));
  localStorage.setItem('cur-season', sSeason);
  document.querySelectorAll('button').
      forEach(b => {if(b.dataset.season == sSeason) b.classList.add('btn_active')}); 
}
function changeSeason(event){
  element = event.target; 
  if(element.type == 'button') {
    document.querySelector('.portfolio_btns_lst').querySelectorAll('button').
        forEach( b => b.classList.remove('btn_active'));
    setSeason(element.dataset.season);
  }
}

//------------------------------------



window.onload = function () {

/*   CreatePfList(document.querySelector('.portfolio_items_img')); */
  setSeason(localStorage.getItem('cur-season'));
  document.querySelector('div.theme__switch').addEventListener('click', switchTheme);
  document.querySelector('.portfolio_btns_lst').addEventListener('click', changeSeason)



  document.querySelectorAll("a.language__link").forEach(element =>
    element.addEventListener("click", function langSwitch() {
      if (!this.classList.contains('switch_on')) {
        document.querySelector("a.language__link.switch_on").classList.toggle("switch_on");
        this.classList.toggle("switch_on");
      }
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