/* Elements */
const searchTitle = document.querySelector('.search-title');
const searchNum = document.querySelector('.search-num');
const searchList = document.querySelector('.search-list');
const genSelect = document.getElementById('genFilter');
const genBtn = document.querySelector('.gen-submit');
const reset = document.querySelector('.reset');
/* Variables */
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

/* Api Calls */
async function getPokemonByRange(value) {
    const { offset, limit } = genParams[value]; 
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
function generateDexId(id) {
  let dexId = "";

  if (id < 10) dexId = "00" + id;
  else if (id >= 10 && id < 100) dexId = "0" + id;
  else dexId = id.toString();

  return dexId;
}

// searchList CreateElements
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
// searchList initial load
async function listLoad(value) {
  const pokemon = await getPokemonByRange(value);

  loadSearchTitle(value);

  for (let i = 0; i < pokemon.length; i++) {
    let currentPokemon = pokemon[i];
    let dexId =  generateDexId(i + 1);
    let name  = currentPokemon.name;
    
    loadSearchList(dexId, name);
  }
}

listLoad('all');
/* Menu Filters */ 
genSelect.addEventListener('change', (e) => {
  let selectedValue = e.target.value;
  genValue = selectedValue;
})

genBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (genValue === '') return;
  searchList.innerHTML = '';
  listLoad(genValue);
})

reset.addEventListener('click', (e) => {
    e.preventDefault();
    searchList.innerHTML = '';
    listLoad('all');
})


