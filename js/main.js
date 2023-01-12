const root = document.documentElement;
/* sideMenu */
const sideMenu = document.querySelector("#sideMenu");
const sideMenuSwitches = document.querySelectorAll(".menu-btn");
const headMenuSwitch = document.querySelector(".menu-btn.head");
// handle hide class
function toggleHideClass(ele) {
  const hideClass = "hide";

  !ele.className.includes(hideClass)
    ? ele.classList.add(hideClass)
    : ele.classList.remove(hideClass);
}
// Handle open class
function toggleOpenClass(ele) {
  const openClass = "open";

  !ele.className.includes(openClass)
    ? ele.classList.add(openClass)
    : ele.classList.remove(openClass);
}
// Handle menu open/close
sideMenuSwitches.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleOpenClass(sideMenu);
  });
});

/* bannerMarquee */
const marqueeContent = document.querySelector("ul.marquee-content");
const marqueeLength = marqueeContent.children.length;
root.style.setProperty("--marquee-elms", marqueeLength);

for (let i = 0; i < marqueeLength; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

/* searchResults */

const searchList = document.querySelector('.search-list');

// API Calls
async function getAllPokemon() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=1008&offset=0";

  try {
    let res = await fetch(url);
    let data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
}
// dexID Handler
function generateDexId(id) {
  let dexId = "";

  if (id < 10) dexId = "00" + id;
  else if (id >= 10 && id < 100) dexId = "0" + id;
  else dexId = id.toString();

  return dexId;
}
// searchList CreateElements
function loadSearchTitle(length, param) {
  const searchTitle = document.querySelector('.search-title');
  const searchNum = document.querySelector('.search-num');
  let title = `All Pokemon`;
  let numStr = `${length} Pokemon Shown` 


  searchTitle.innerHTML = title;
  searchNum.innerHTML = numStr;
}
function loadSearchList(id, name) {
  const listItem = document.createElement('li');
  const infoLink = document.createElement('a');

  listItem.classList.add('search-item');
  infoLink.classList.add('info-link')
  infoLink.setAttribute('href', '#');
  infoLink.setAttribute('data-name', name);

  infoLink.innerHTML = `${id} ${name}`;

  listItem.appendChild(infoLink);
  searchList.appendChild(listItem);
}
// searchList Load Handler
async function intitalListLoad() {
  const allPokemon = await getAllPokemon();
  const allLength = allPokemon.length;

  loadSearchTitle(allLength, 'all');

  for (let i = 0; i < allLength; i++) {
    let currentPokemon = allPokemon[i];
    let dexId =  generateDexId(i + 1);
    let name  = currentPokemon.name;
    
    loadSearchList(dexId, name);
  }
}

intitalListLoad();