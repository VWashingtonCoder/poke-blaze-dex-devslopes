const pokemonGroup = document.querySelectorAll('.info-btn');
const infoHead = document.querySelector('.info-head');
const infoImgBox = document.querySelector('.info-img-box')
const topInfo = document.querySelector('.top-info');

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
}

function createInfoImg(imgSrc) {
    const infoImg = document.createElement('img');
    infoImg.setAttribute('src', imgSrc);
    infoImg.setAttribute('alt', 'pokemon picture');
    infoImgBox.appendChild(infoImg);
}

function createIdNameInfo(idName) {
    const topName = document.createElement('h3');
    topName.classList.add('id-name-info');
    topName.innerText = idName;
    topInfo.appendChild(topName);
}

function createTypesInfo(types) {
    const topTypes = document.createElement('h4');
    let typeStr = 'Type(s):';
    for(let i = 0; i < types.length; i++) {
        const typeName = types[i].type.name;
        i !== types.length - 1 
            ? typeStr = typeStr + ` ${typeName} /` 
            : typeStr = typeStr + ` ${typeName}` 
    }
    topTypes.classList.add('types-info');
    topTypes.innerText = typeStr;
    topInfo.appendChild(topTypes);
}

function createHeightInfo(height) {
    const heightStr = convertHeight(height);
    const heightInfo = document.createElement('h4');
    heightInfo.classList.add('height-info');
    heightInfo.innerText = heightStr;
    topInfo.appendChild(heightInfo);
}

function createWeightInfo(weight) {
    const weightStr = convertWeight(weight);
    const weightInfo = document.createElement('h4');
    weightInfo.classList.add('weight-info');
    weightInfo.innerText = weightStr;
    topInfo.appendChild(weightInfo);
}


async function loadInfoMod(name, idName) {
    const pokemon = await getPokemonByName(name);
    // abilities, height, id, moves, types, weight
    const imgSrc = pokemon.sprites.front_default;
    const types = pokemon.types;
    const height = pokemon.height;
    const weight = pokemon.weight;

    createInfoImg(imgSrc);
    createIdNameInfo(idName);
    createTypesInfo(types);
    createHeightInfo(height);
    createWeightInfo(weight);
    
    console.log("Success");
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