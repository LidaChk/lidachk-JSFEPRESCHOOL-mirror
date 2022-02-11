
let apiNASA = {};
async function getData() {
  const res = await fetch("https://images-api.nasa.gov/search?q=hubble nebula");
  apiNASA = await res.json();
  console.log(apiNASA);
}
getData();
