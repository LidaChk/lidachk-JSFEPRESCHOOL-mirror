const ImageList = document.querySelector(".image-list");
const html =
  `<div class='card hidden'>
  <div class='info'>
    <h2 class='title'>testtest</h2>
    <p class='description'>testtest testtest</p>
  </div>
</div>`;


let apiNASA = {};


async function getData() {
  const res = await fetch("https://images-api.nasa.gov/search?keywords=HubbleSpaceTelescope, supernova, explosion&media_type=image");
  apiNASA = await res.json();
  console.log(apiNASA);
  for (let i = 0; i <= apiNASA.collection.items.length - 1; i++) {
    CreateListItem(apiNASA.collection.items[i])   
  }
}



function CreateListItem(objItem) {

  let li = document.createElement('li');
  //li.innerHTML = html;
  let img = document.createElement('img');
  img.src = objItem.links[0].href;
  img.loading = "lazy";
  img.alt = objItem.data[0].title;
  setTimeout(() =>{img.classList.add("visible")},100);
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


getData();
