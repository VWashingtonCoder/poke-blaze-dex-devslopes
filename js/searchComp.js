/* Elements */
const searchTitle = document.querySelector('.search-title');
const searchNum = document.querySelector('.search-num');
const searchList = document.querySelector('.search-list');
const selectGroup = document.querySelectorAll('.filter-select');
const genSelect = document.getElementById('genFilter');
const typeSelect = document.getElementById('typeFilter');
const reset = document.querySelector('.reset');

/* Data Variables */
const genParams = {
  all: {
    offset: 0, 
    limit: 1008, 
    title:'All Pokemon'
  },
  genOne: {
    offset: 0, 
    limit: 151, 
    title:'Kanto_Generation 1 (#001-#151)'
  }, 
  genTwo: {
    offset: 151, 
    limit: 100, 
    title:'Johto_Generation 2 (#152-#251)'
  },
  genThree: {
    offset: 251, 
    limit: 135, 
    title:'Hoenn_Generation 3 (#252-#386)'
  },
  genFour: {
    offset: 386, 
    limit: 108, 
    title:'Sinnoh_Generation 4 (#387-#494)'
  },
  genFive: {
    offset: 494, 
    limit: 155, 
    title:'Unova_Generation 5 (#495-#649)'
  },
  genSix: {
    offset: 649, 
    limit: 72, 
    title:'Kalos_Generation 6 (#650-#721)'
  },
  genSeven: {
    offset: 721, 
    limit: 88, 
    title:'Alola_Generation 7 (#722-#809)'
  },
  genEight: {
    offset: 809, 
    limit: 89, 
    title:'Galar_Generation 8 (#810-#898)'
  },
  genEightHalf: {
    offset: 898, 
    limit: 7, 
    title:'Hisui_Generation 8.5 (#899-#905)'
  },
  genNine: {
    offset: 905, 
    limit: 103, 
    title:'Paldea_Generation 9 (#906-#1008)'
  }
}
const genFilterData = [
  { value: 'genOne', text: 'Generation 1 (#001-#151)'},
  { value: 'genTwo', text: 'Generation 2 (#152-#251)'},
  { value: 'genThree', text: 'Generation 3 (#252-#386)'},
  { value: 'genFour', text: 'Generation 4 (#387-#494)'},
  { value: 'genFive', text: 'Generation 5 (#495-#649)'},
  { value: 'genSix', text: 'Generation 6 (#650-#721)'},
  { value: 'genSeven', text: 'Generation 7 (#722-#809)'},
  { value: 'genEight', text: 'Generation 8 (#810-#898)'},
  { value: 'genEightHalf', text: 'Generation 8.5 (#899-#905)'},
  { value: 'genNine', text: 'Generation 9 (#906-#1008)'}
]
/* State Variables */
let genValue = '';
let typeValue = '';

/* Api Calls */
async function fetchPokemonTypes() {
  const allTypesUrl = 'https://pokeapi.co/api/v2/type';

  try {
    let res = await fetch(allTypesUrl);
    let data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
}

async function getPokemonByRange(gen) {
    const { offset, limit } = genParams[gen]; 
    const rangeUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  
    try {
        let res = await fetch(rangeUrl);
        let data = await res.json();
        return data.results;
    } catch (err) {
        console.log(err);
    }
}

async function getPokemonByType(type) {
  const typeUrl = `https://pokeapi.co/api/v2/type/${type}`;

  try {
    let res = await fetch(typeUrl);
    let data = await res.json();
    return data.pokemon;
  } catch (err) {
    console.log(err);
  }
}

// dexID Handler
function generateDexId(value, idx) {
  const { offset } = genParams[value];
  let dexId = "";
  let id = offset + idx;

  if (id < 10) dexId = "00" + id;
  else if (id >= 10 && id < 100) dexId = "0" + id;
  else dexId = id.toString();

  return dexId;
}

// load elements
function loadGenOptions() {
  genFilterData.forEach(gen => {
    const { value, text } = gen;
    const option = document.createElement('option');

    option.classList.add('genOption');
    option.setAttribute('value', value);
    option.innerHTML = text;

    genSelect.appendChild(option);
  })
}

async function loadTypeOptions() {
  const allTypes = await fetchPokemonTypes();

  for(let i = 0; i < allTypes.length - 2; i++){
    const { name } = allTypes[i];
    const option = document.createElement('option');

    option.classList.add('genOption');
    option.setAttribute('value', name);
    option.innerHTML = name;

    typeSelect.appendChild(option);
  }
}

function loadSearchTitle(value, num) {
  let titleStr = ''
  let numStr = ''; 
  
  if(value.includes('gen') || value === 'all'){
    const { limit, title } = genParams[value];
    titleStr = title;
    numStr = `${limit} Pokemon Shown`; 
    
  } else {
    titleStr = `${value} Pokemon`
    numStr = `${num} Pokemon Shown`;
  }

  searchTitle.innerHTML = titleStr;
  searchNum.innerHTML = numStr;
}

function loadSearchList(name, id) {
  const listItem = document.createElement('li');
  const infoBtn = document.createElement('button');
  let innerText = '';

  listItem.classList.add('search-item');
  infoBtn.classList.add('info-btn');
  infoBtn.setAttribute('data-name', name);

  id ? innerText = `${id} ${name}` : innerText = name;

  infoBtn.innerHTML = innerText;

  listItem.appendChild(infoBtn);
  searchList.appendChild(listItem);

}

// searchList load
async function listLoadGen(gen) {
  const pokemon = await getPokemonByRange(gen);
  loadSearchTitle(gen);
  for (let i = 0; i < pokemon.length; i++) {
    let currentPokemon = pokemon[i];
    let dexId =  generateDexId(gen, i + 1);
    let name  = currentPokemon.name;
    loadSearchList(name, dexId);
  }
}

async function listLoadType(type) {
  const pokemonOfType = await getPokemonByType(type);
  const totalPokemon = pokemonOfType.length;
  loadSearchTitle(type, totalPokemon);
  
  pokemonOfType.forEach(pkmn => {
    let currentPokemon = pkmn.pokemon;
    let name = currentPokemon.name;
    loadSearchList(name); 
  })
}

/* Menu Filters */ 
selectGroup.forEach(select => {
  if (select.className.includes('gen')) loadGenOptions();
  else if (select.className.includes('type')) loadTypeOptions();
})

genSelect.addEventListener('change', (e) => {
  e.preventDefault();
  genValue = e.target.value;
  if (genValue === '') return;
  searchList.innerHTML = '';
  listLoadGen(genValue);
});

typeSelect.addEventListener('change', (e) => {
  e.preventDefault();
  typeValue = e.target.value;
  if (typeValue === '') return;
  searchList.innerHTML = '';
  listLoadType(typeValue);
})
reset.addEventListener('click', (e) => {
    e.preventDefault();
    searchList.innerHTML = '';
    listLoadGen('all');
});

/*Inital Load*/
listLoadGen('all');