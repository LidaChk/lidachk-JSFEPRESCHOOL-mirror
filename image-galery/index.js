const ImageList = document.querySelector(".image-list");
const InputSerach = document.querySelector(".search-input");
const containerSearch = document.querySelector(".container-search");


const apiUrl = "https://images-api.nasa.gov/search?";
const apiUrlEnd = "&media_type=image";
const apiUrlValDefault = "keywords=Carina,HubbleSpaceTelescope,supernova,Galactic";
const nothigFound = 
` <li class="nasa-item">
    <div class='card-notFound'>
      <h3 class='title-nf'>Nothing found.</h3>
      <h3 class='title-nf'>Try again.</h3>
    </div>
  </li>`


const html =
  `<div class='card hidden'>
  <div class='info'>
    <h2 class='title'>testtest</h2>
    <p class='description'>testtest testtest</p>
  </div>
</div>`;


let apiNASA = {};


async function getData() {
  
  let sValue = InputSerach.value.toLowerCase();
  let apiUrlVal = apiUrlValDefault;

  if (sValue != '')  apiUrlVal = (sValue.search(',') < 0) ? "q=" + sValue : "keywords=" + sValue;

  
  const res = await fetch(apiUrl + apiUrlVal + apiUrlEnd);
  apiNASA = await res.json();
  //console.log(apiNASA);

  ImageList.innerHTML = '';
  if(apiNASA.collection.items.length == 0) ImageList.innerHTML = nothigFound;
  for (let i = 0; i <= apiNASA.collection.items.length - 1; i++) {
    CreateListItem(apiNASA.collection.items[i])
  }
}



function CreateListItem(objItem) {

  document.querySelectorAll('li.nasa-item').forEach(el => {
    el.removeEventListener("mouseover", function (event) {
      this.querySelector('div.title').classList.add('visible');
    });
    el.removeEventListener("mouseout", function (event) {
      this.querySelector('div.title').classList.remove('visible');});
    });

  let li = document.createElement('li');
  li.classList.add('nasa-item');
  //li.innerHTML = html;
  let img = document.createElement('img');
  img.src = objItem.links[0].href;
  img.loading = "lazy";
  img.alt = objItem.data[0].title;
  img.classList.add("nasa-img")
  setTimeout(() => {
    img.classList.add("visible")
  }, 100);
  li.appendChild(img);


  let title = document.createElement('div');
  title.classList.add('title');
  title.textContent = objItem.data[0].title;
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