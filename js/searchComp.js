/* Elements */
const searchTitle = document.querySelector('.search-title');
const searchNum = document.querySelector('.search-num');
const searchList = document.querySelector('.search-list');
const selectGroup = document.querySelectorAll('.filter-select');
const genSelect = document.getElementById('genFilter');
const typeSelect = document.getElementById('typeFilter');
const reset = document.querySelector('.reset');

/* Gen Variables */
let genValue = '';
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

function loadSearchTitle(value) {
  const { limit, title } = genParams[value];
  let numStr = `${limit} Pokemon Shown`; 
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

// searchList load
async function listLoad(value) {
  const pokemon = await getPokemonByRange(value);
  loadSearchTitle(value);
  for (let i = 0; i < pokemon.length; i++) {
    let currentPokemon = pokemon[i];
    let dexId =  generateDexId(value, i + 1);
    let name  = currentPokemon.name;
    loadSearchList(dexId, name);
  }
}

/* Menu Filters */ 
selectGroup.forEach(select => {
  if (select.className.includes('gen')) loadGenOptions();
  else if (select.className.includes('type')) loadTypeOptions();
})

genSelect.addEventListener('change', (e) => {
  e.preventDefault();
  let selectedValue = e.target.value;
  genValue = selectedValue;
  if (genValue === '') return;
  searchList.innerHTML = '';
  listLoad(genValue);
});


reset.addEventListener('click', (e) => {
    e.preventDefault();
    searchList.innerHTML = '';
    listLoad('all');
});

/*Inital Load*/
listLoad('all');