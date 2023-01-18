const root = document.documentElement;
/* sideMenu */
const sideMenu = document.querySelector("#sideMenu");
const sideMenuSwitches = document.querySelectorAll(".menu-btn");
const headMenuSwitch = document.querySelector(".menu-btn.head");
const filterSelects = document.querySelectorAll(".filter-select");
const genSelect = document.getElementById('genFilter');
const typeSelect = document.getElementById('typeFilter');
const reset = document.querySelector('.reset');
/* bannerMarquee */
const marqueeContent = document.querySelector("ul.marquee-content");
const marqueeLength = marqueeContent.children.length;
/* searchResults */
const searchTitle = document.querySelector('.search-title');
const searchNum = document.querySelector('.search-num');
const searchList = document.querySelector('.search-list');
/* infoModule */
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