/* variables */
const pokemonGroup = document.querySelectorAll('.info-btn');
const infoModule = document.querySelector('#infoModule');
const infoX = document.querySelector('.info-x');
const infoHead = document.querySelector('.info-head');
const infoImgBox = document.querySelector('.info-img-box')
const topInfo = document.querySelector('.top-info');
const infoImg = document.querySelector('.info-img');
const idNameInfo = document.querySelector('.id-name-info');
const typesInfo = document.querySelector('.types-info');
const heightInfo = document.querySelector('.height-info');
const weightInfo = document.querySelector('.weight-info');
const abilitiesInfo = document.querySelector(".abilities-info")
const movesTitle = document.querySelector(".moves-title");
const movesList = document.querySelector(".moves-list");
/* api function */
async function getPokemonByName(name) {
    const nameUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
    try {
        let res = await fetch(nameUrl);
        let data = await res.json();
        return data
      } catch (err) {
        console.log(err);
      }
}
/* helper functions */
function createTypeStr(types) {
    let typeStr = 'Type(s):';
    for(let i = 0; i < types.length; i++) {
        const typeName = types[i].type.name;
        i !== types.length - 1 
            ? typeStr = typeStr + ` ${typeName} /` 
            : typeStr = typeStr + ` ${typeName}` 
    }
    return typeStr;
}
function convertHeight(height) {
    const meters = height / 10;
    const inchesTotal = meters / 0.0254;
    const feet = Math.floor(inchesTotal / 12);
    const inchesLeft = Math.ceil(inchesTotal - (12 * feet));
    return `Height: ${feet}'${inchesLeft}"`
}
function convertWeight(weight) {
    const kilograms = weight / 10;
    const pounds = (kilograms * 2.205).toFixed(1);
    return `Weight: ${pounds} lbs / ${kilograms} kg`
}
function createAbilitiesStr(abilities) {
    let ability = '';
    let abilitiesStr = 'Abilities:';
    for(let i = 0; i < abilities.length; i++) {
        ability = abilities[i].ability.name;
        i !== (abilities.length - 1) 
            ? abilitiesStr = abilitiesStr + ` ${ability} /`
            : abilitiesStr = abilitiesStr + ` ${ability}`;
    }
    return abilitiesStr;
}
function createMoveList(moves) {
    let move = '';
    let splitMoveName = [];
    let joinMoveName = '';
    for(let i = 0; i < moves.length; i++) {
        const moveItem = document.createElement('li');
        move = moves[i].move.name;
        if(move.includes('-')) {
            splitMoveName = move.split('-');
            splitMoveName.forEach(piece => {
                joinMoveName = joinMoveName + `${piece} `
            })

            move = joinMoveName;
            joinMoveName = '';
        } 
        moveItem.classList.add('move-item');
        moveItem.innerText = move;
        movesList.appendChild(moveItem);
    };
}
/* load infoModule */
async function loadInfoMod(name, idName) {
    const pokemon = await getPokemonByName(name);
    const imgSrc = pokemon.sprites.front_default;
    const typeStr = createTypeStr(pokemon.types);
    const heightStr = convertHeight(pokemon.height);
    const weightStr = convertWeight(pokemon.weight);
    const abilitiesStr = createAbilitiesStr(pokemon.abilities);
    const movesTitleStr = `Moveset: ${pokemon.moves.length} Moves`;

    infoImg.setAttribute('src', imgSrc);
    idNameInfo.innerText = idName;
    typesInfo.innerText = typeStr;
    heightInfo.innerText = heightStr;
    weightInfo.innerText = weightStr;
    abilitiesInfo.innerText = abilitiesStr;
    movesTitle.innerHTML = movesTitleStr;
    createMoveList(pokemon.moves);
}
pokemonGroup.forEach(link => {
    link.addEventListener('click', (e) => {
        const pokemonName = e.target.dataset.name;
        const pokemonIdName = e.target.innerHTML;
        loadInfoMod(pokemonName, pokemonIdName);
        toggleHideClass(infoModule);
    })
})
infoX.addEventListener('click', (e) => {
    toggleHideClass(infoModule);
})