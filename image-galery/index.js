console.log(
  " Добавлена возможность поиска по тегам , приходящим с метадатой изображения.\n Всплывающий заголовок и теги повявляются при наведенеии на изображение.\n При клике по тегу происходит поиск по этому тегу.\n",
  "\n",
  "Оценка задания: 70\n",
  "[x] 1. на странице есть несколько фото и строка поиска  (5)\n",
  "[x] 2. в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс (5)\n",
  "[x] 3. При загрузке приложения на странице отображаются полученные от API изображения (+10)\n",
  "[x] 4. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики(+10)\n",
  "[x] 5. при открытии приложения курсор находится в поле ввода  (5)\n",
  "[x] 6. есть placeholder (5)\n",
  "[x] 7. автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) (+5)\n",
  "[x] 8. поисковый запрос можно отправить нажатием клавиши Enter(+5)\n",
  "[x] 9. после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода  (5)\n",
  "[x] 10. в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder (5)\n",
  "[x] 11. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения (10)\n",
  
);

const ImageList = document.querySelector(".image-list");
const InputSerach = document.querySelector(".search-input");
const containerSearch = document.querySelector(".container-search");


const apiUrl = "https://images-api.nasa.gov/search?";
const apiUrlEnd = "&media_type=image";
const apiUrlValDefault = "keywords=Ghostly,Carina,HubbleSpaceTelescope,supernova,Galactic,Herschel";
const nothigFound =
  ` <li class="nasa-item">
    <div class='card-notFound'>
      <h3 class='title-nf'>Nothing found.</h3>
      <h3 class='title-nf'>Try again.</h3>
    </div>
  </li>`



/* const html =
  `<div class='card hidden'>
  <div class='info'>
    <h2 class='title'>testtest</h2>
    <p class='description'>testtest testtest</p>
  </div>
</div>`; */


let apiNASA = {};
let sSearchTag = '';

async function getData() {

  let sValue = InputSerach.value.toLowerCase();
  let apiUrlVal = apiUrlValDefault;

  if (sSearchTag != '') { //serach on clicking tag
    apiUrlVal = "keywords=" + sSearchTag.slice(1);
    sSearchTag = '';
  } else if (sValue != '') { // search by input search
    apiUrlVal = (sValue.search(',') < 0) ? "q=" + sValue : "keywords=" + sValue;
  }


  const res = await fetch(apiUrl + apiUrlVal + apiUrlEnd);
  apiNASA = await res.json();
  //console.log(apiNASA);

  ImageList.innerHTML = '';
  ImageList.style.opacity = '0';
  if (apiNASA.collection.items.length == 0) ImageList.innerHTML = nothigFound;
  for (let i = 0; i <= apiNASA.collection.items.length - 1; i++) {
    CreateListItem(apiNASA.collection.items[i])
  }
  ImageList.style.opacity = '1';
}


/* create one image list element for every returned item*/
function CreateListItem(objItem) {

  /*delete all preveuse event handlers*/
  document.querySelectorAll('li.nasa-item').forEach(el => {
    el.removeEventListener("mouseover", function (event) {
      this.querySelector('div.title').classList.add('visible');
    });
    el.removeEventListener("mouseout", function (event) {
      this.querySelector('div.title').classList.remove('visible');
    });
  });

  let li = document.createElement('li');
  li.classList.add('nasa-item');
  //li.innerHTML = html;
  let img = document.createElement('img');
  img.src = objItem.links[0].href;
  img.loading = "lazy";
  img.alt = objItem.data[0].title;
  img.classList.add("nasa-img")
  
  /* user wil not see loading blink*/
  setTimeout(() => {
    img.classList.add("visible")
  }, 300);
  
  li.appendChild(img);

  /* hidden title for every image from ketadata*/
  let title = document.createElement('div');
  title.classList.add('title');
  title.textContent = objItem.data[0].title;

  /*tags for endless trip trow nasa keywords*/  
  let tags = document.createElement('p');
  for (i = 0; i < objItem.data[0].keywords.length; i++) {
    let s = objItem.data[0].keywords[i];
    if (s.length > 2) tags.innerHTML = tags.innerHTML + `<a href="#" class="link keyword-link" onclick="GetDataByTag(this)">#${objItem.data[0].keywords[i]} </a>`;
  }

  title.appendChild(tags);
  ImageList.appendChild(title);
  li.appendChild(title);

  //li.querySelector('.title').textContent = objItem.data[0].title;
  //li.querySelector('.description').innerHTML = objItem.data[0].description;

  li.addEventListener("mouseover", function (event) {
    this.querySelector('div.title').classList.add('visible');
  });
  li.addEventListener("mouseout", function (event) {
    this.querySelector('div.title').classList.remove('visible');
  });

  ImageList.appendChild(li);
}

function GetDataByTag(lTag){
  sSearchTag = lTag.textContent;
  getData();
  return false;
}


/*Input Search Events*/
InputSerach.addEventListener("focusin", function (event) {
  containerSearch.classList.add('hover-clmf');
});
InputSerach.addEventListener("focusout", function (event) {
  containerSearch.classList.remove('hover-clmf');
});
InputSerach.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    getData();
  };
});



getData();