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
function loadFavorites() {
  const favoritesLength = favorites.length;
  searchList.innerHTML = "";
  loadSearchHeader("Favorite", favoritesLength);
  favorites.forEach((fav) => {
    loadSearchList(fav);
  });
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
        toggleOpenClass(infoModule);
        loadInfoMod(pokemonName, pokemonIdName);
      });
    });
  }, 1000);

  setTimeout(() => {
    const favsBtns = document.querySelectorAll('.favs-btn');
    favsBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); 
        let btnInnerText = '';
        const item = e.target.parentNode;
        const value = e.target.value;
        if(!favorites.includes(value)) {
          favorites.push(value);
          btnInnerText = "➖ Remove From Favorites"
        } else {
          const removeIdx = favorites.indexOf(value);
          favorites.splice(removeIdx, 1);
          btnInnerText = '➕ Add To Favorites'

          if(searchTitle.innerText.includes("Favorite")) {
            searchList.removeChild(item);
          }
        }
        e.target.innerText = btnInnerText;
      })
    })
  }, 1000);
}
/* Load Functions */


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

