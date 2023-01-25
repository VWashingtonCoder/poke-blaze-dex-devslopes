const sideMenu = document.querySelector("#sideMenu");
const sideMenuSwitches = document.querySelectorAll(".menu-control");
const filterSelects = document.querySelectorAll(".filter-select");
const genSelect = document.getElementById("genFilter");
const typeSelect = document.getElementById("typeFilter");
const favMenuBtn = document.querySelector('.fav-menu-btn');
const reset = document.querySelector(".reset");
const favsSortDiv = document.querySelector(".favs-sort");
const favsSortBtns = document.querySelectorAll(".sort-btn")
const searchTitle = document.querySelector('.search-title');
const searchNum = document.querySelector('.search-num');
const searchList = document.querySelector('.search-list');
/* Load Selects */
function loadGenOptions() {
  genFilterData.forEach((gen) => {
    const { value, text } = gen;
    const option = document.createElement("option");
    option.classList.add("genOption");
    option.setAttribute("value", value);
    option.innerHTML = text;
    genSelect.appendChild(option);
  });
}
async function loadTypeOptions() {
  const allTypes = await fetchPokemonTypes();
  for (let i = 0; i < allTypes.length - 2; i++) {
    const { name } = allTypes[i];
    const option = document.createElement("option");
    option.classList.add("genOption");
    option.setAttribute("value", name);
    option.innerHTML = name;
    typeSelect.appendChild(option);
  }
}
/* Load List */
function loadSearchHeader(value, num) {
  let titleStr = "";
  let numStr = "";
  if (value.includes("gen") || value === "all") {
    const { limit, title } = genParams[value];
    titleStr = title;
    numStr = `${limit} Pokemon Shown`;
  } else {
    titleStr = `${value} Pokemon`;
    numStr = `${num} Pokemon Shown`;
  }
  searchTitle.innerHTML = titleStr;
  searchNum.innerHTML = numStr;
}

function loadSearchList(name, id) {
  const listItem = document.createElement("li");
  const infoBtn = document.createElement("button");
  const addToFavsBtn = document.createElement("button");
  let idInnerText = "";
  let btnInnerText = "";

  infoBtn.classList.add("info-btn");
  infoBtn.setAttribute("data-name", name);
  id ? (idInnerText = `${id} ${name}`) : (idInnerText = name);
  infoBtn.innerHTML = idInnerText;

  addToFavsBtn.classList.add("favs-btn");
  addToFavsBtn.setAttribute("value", name);
  !favorites.includes(name)
    ? (btnInnerText = "➕ Add To Favorites")
    : (btnInnerText = "➖ Remove From Favorites");
  addToFavsBtn.innerText = btnInnerText;

  listItem.classList.add("search-item");
  listItem.appendChild(infoBtn);
  listItem.appendChild(addToFavsBtn);
  searchList.appendChild(listItem);
}

async function listLoadGen(gen) {
  const pokemon = await getPokemonByRange(gen);
  loadSearchHeader(gen);
  for (let i = 0; i < pokemon.length; i++) {
    let currentPokemon = pokemon[i];
    let dexId = generateDexId(gen, i + 1);
    let name = currentPokemon.name;
    loadSearchList(name, dexId);
  }
}

async function listLoadType(type) {
  const pokemonOfType = await getPokemonByType(type);
  const totalPokemon = pokemonOfType.length;
  loadSearchHeader(type, totalPokemon);
  pokemonOfType.forEach((pkmn) => {
    let currentPokemon = pkmn.pokemon;
    let name = currentPokemon.name;
    loadSearchList(name);
  });
}

/* Add Events */
sideMenuSwitches.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleOpenClass(sideMenu);
  });
});

filterSelects.forEach((select) => {
  if (select.className.includes("gen")) loadGenOptions();
  else if (select.className.includes("type")) loadTypeOptions();
});

genSelect.addEventListener("change", (e) => {
  e.preventDefault();
  genValue = e.target.value;
  if (genValue === "") return;
  searchList.innerHTML = "";
  listLoadGen(genValue);
  setOnClick();
  toggleOpenClass(sideMenu);

  if (infoModule.className.includes("open")) {
    toggleOpenClass(infoModule);
  }
});

typeSelect.addEventListener("change", (e) => {
  e.preventDefault();
  typeValue = e.target.value;
  if (typeValue === "") return;
  searchList.innerHTML = "";
  listLoadType(typeValue);
  setOnClick();
  toggleOpenClass(sideMenu);
  if (infoModule.className.includes("open")) {
    toggleOpenClass(infoModule);
  }
});

favMenuBtn.addEventListener("click", () => {
    loadFavorites();
  toggleHideClass(favsSortDiv);
  setOnClick();
  if (infoModule.className.includes("open")) {
    toggleOpenClass(infoModule);
  }
});

reset.addEventListener("click", (e) => {
  e.preventDefault();
  searchList.innerHTML = "";
  listLoadGen("all");
  setOnClick();
  if (infoModule.className.includes("open")) {
    toggleOpenClass(infoModule);
  }
});

console.log(favsSortBtns)

function sortFavorites(value) {
    if(value === "alpha") {
        favorites.sort();    
    } else {
        favorites.sort();
        favorites.reverse();
    }
    loadFavorites();
    setOnClick;
}

favsSortBtns.forEach((btn) => {
    console.log(btn)
    btn.addEventListener('click', (e) => {
       sortFavorites(e.target.value);
    })
})
/*Initial Load*/
listLoadGen('all');
setOnClick();