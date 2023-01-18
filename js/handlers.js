function toggleHideClass(ele) {
  const hideClass = "hide";
  !ele.className.includes(hideClass)
    ? ele.classList.add(hideClass)
    : ele.classList.remove(hideClass);
}
function toggleOpenClass(ele) {
  const openClass = "open";
  !ele.className.includes(openClass)
    ? ele.classList.add(openClass)
    : ele.classList.remove(openClass);
}
function generateDexId(value, idx) {
  const { offset } = genParams[value];
  let dexId = "";
  let id = offset + idx;
  if (id < 10) dexId = "00" + id;
  else if (id >= 10 && id < 100) dexId = "0" + id;
  else dexId = id.toString();
  return dexId;
}
function createTypeStr(types) {
  let typeStr = "Type:";
  for (let i = 0; i < types.length; i++) {
    const typeName = types[i].type.name;
    i !== types.length - 1
      ? (typeStr = typeStr + ` ${typeName} /`)
      : (typeStr = typeStr + ` ${typeName}`);
  }
  return typeStr;
}
function convertHeight(height) {
  const meters = height / 10;
  const inchesTotal = meters / 0.0254;
  const feet = Math.floor(inchesTotal / 12);
  const inchesLeft = Math.ceil(inchesTotal - 12 * feet);
  return `Height: ${feet}'${inchesLeft}"`;
}
function convertWeight(weight) {
  const kilograms = weight / 10;
  const pounds = (kilograms * 2.205).toFixed(1);
  return `Weight: ${pounds} lbs / ${kilograms} kg`;
}
function createAbilitiesStr(abilities) {
  let ability = "";
  let abilitiesStr = "Abilities:";
  for (let i = 0; i < abilities.length; i++) {
    ability = abilities[i].ability.name;
    i !== abilities.length - 1
      ? (abilitiesStr = abilitiesStr + ` ${ability} /`)
      : (abilitiesStr = abilitiesStr + ` ${ability}`);
  }
  return abilitiesStr;
}
function createMoveList(moves) {
  let move = "";
  let splitMoveName = [];
  let joinMoveName = "";
  for (let i = 0; i < moves.length; i++) {
    const moveItem = document.createElement("li");
    move = moves[i].move.name;
    if (move.includes("-")) {
      splitMoveName = move.split("-");
      splitMoveName.forEach((piece) => {
        joinMoveName = joinMoveName + `${piece} `;
      });

      move = joinMoveName;
      joinMoveName = "";
    }
    moveItem.classList.add("move-item");
    moveItem.innerText = move;
    movesList.appendChild(moveItem);
  }
}
function setOnClick() {
  setTimeout(() => {
    const pokemonGroup = document.querySelectorAll(".info-btn");
    pokemonGroup.forEach((link) => {
      link.addEventListener("click", (e) => {
        const pokemonName = e.target.dataset.name;
        const pokemonIdName = e.target.innerHTML;
        toggleHideClass(infoModule);
        loadInfoMod(pokemonName, pokemonIdName);
      });
    });
  }, 1000);
}
/* Load Functions */
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
  let innerText = "";
  listItem.classList.add("search-item");
  infoBtn.classList.add("info-btn");
  infoBtn.setAttribute("data-name", name);
  id ? (innerText = `${id} ${name}`) : (innerText = name);
  infoBtn.innerHTML = innerText;
  listItem.appendChild(infoBtn);
  searchList.appendChild(listItem);
}
/* asyncs */
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
async function loadInfoMod(name, idName) {
  const pokemon = await getPokemonByName(name);
  const imgSrc = pokemon.sprites.front_default;
  const typeStr = createTypeStr(pokemon.types);
  const heightStr = convertHeight(pokemon.height);
  const weightStr = convertWeight(pokemon.weight);
  const abilitiesStr = createAbilitiesStr(pokemon.abilities);
  const movesTitleStr = `Moveset: ${pokemon.moves.length} Moves`;
  infoImg.setAttribute("src", imgSrc);
  idNameInfo.innerText = idName;
  typesInfo.innerText = typeStr;
  heightInfo.innerText = heightStr;
  weightInfo.innerText = weightStr;
  abilitiesInfo.innerText = abilitiesStr;
  movesTitle.innerHTML = movesTitleStr;
  movesList.innerHTML = '';
  createMoveList(pokemon.moves);
  favsBtn.setAttribute('value', idName);
}
