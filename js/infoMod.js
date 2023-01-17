const pokemonGroup = document.querySelectorAll('.info-btn');
const infoHead = document.querySelector('.info-head');
const infoImgBox = document.querySelector('.info-img-box')
const topInfo = document.querySelector('.top-info');
const idNameInfo = document.querySelector('.id-name-info');
const typesInfo = document.querySelector('.types-info');
const heightInfo = document.querySelector('.height-info');
const weightInfo = document.querySelector('.weight-info');
const abilitiesInfo = document.querySelector(".abilities-info")
const movesTitle = document.querySelector(".moves-title");
const movesList = document.querySelector(".moves-list");

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


function clearMod() {
    infoImgBox.innerHTML = '';
    topInfo.innerHTML = '';
    abilitiesBox.innerHTML = '';
}

function createInfoImg(imgSrc) {
    const infoImg = document.createElement('img');
    infoImg.setAttribute('src', imgSrc);
    infoImg.setAttribute('alt', 'pokemon picture');
    infoImgBox.appendChild(infoImg);
}

function createIdNameInfo(idName) {
    idNameInfo.innerText = idName;
}

function createTypesInfo(types) {
    let typeStr = 'Type(s):';
    for(let i = 0; i < types.length; i++) {
        const typeName = types[i].type.name;
        i !== types.length - 1 
            ? typeStr = typeStr + ` ${typeName} /` 
            : typeStr = typeStr + ` ${typeName}` 
    }
    typesInfo.innerText = typeStr;
}

function createHeightInfo(height) {
    const heightStr = convertHeight(height);
    heightInfo.innerText = heightStr;
}

function createWeightInfo(weight) {
    const weightStr = convertWeight(weight);
    weightInfo.innerText = weightStr;
}

function createAbilitiesInfo(abilities) {
    let ability = '';
    let abilitiesStr = 'Abilities:';
    for(let i = 0; i < abilities.length; i++) {
        ability = abilities[i].ability.name;
        i !== (abilities.length - 1) 
            ? abilitiesStr = abilitiesStr + ` ${ability} /`
            : abilitiesStr = abilitiesStr + ` ${ability}`;
    }
    abilitiesInfo.innerText = abilitiesStr;
}

function createMovesTitle(moves) {
    const movesTitleStr = `Moveset: ${moves.length} Moves`;
    movesTitle.innerHTML = movesTitleStr;
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

async function loadInfoMod(name, idName) {
    const pokemon = await getPokemonByName(name);
    const imgSrc = pokemon.sprites.front_default;
    const types = pokemon.types;
    const height = pokemon.height;
    const weight = pokemon.weight;
    const abilities = pokemon.abilities;
    const moves = pokemon.moves;

    createInfoImg(imgSrc);



    createIdNameInfo(idName);
    createTypesInfo(types);
    createHeightInfo(height);
    createWeightInfo(weight);
    
    
    createAbilitiesInfo(abilities);
    createMovesTitle(moves);
    createMoveList(moves);
}

pokemonGroup.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pokemonName = e.target.dataset.name;
        const pokemonIdName = e.target.innerHTML;
        clearMod();
        loadInfoMod(pokemonName, pokemonIdName);
    })
})