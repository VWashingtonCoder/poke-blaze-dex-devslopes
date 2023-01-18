/* bannerMarquee */
root.style.setProperty("--marquee-elms", marqueeLength);
for (let i = 0; i < marqueeLength; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
/* Handle menu open/close */ 
sideMenuSwitches.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleOpenClass(sideMenu);
  });
});
filterSelects.forEach((select) => {
  if (select.className.includes('gen')) loadGenOptions();
  else if (select.className.includes('type')) loadTypeOptions(); 
})
genSelect.addEventListener('change', (e) => {
  e.preventDefault();
  genValue = e.target.value;
  if (genValue === '') return;
  searchList.innerHTML = '';
  listLoadGen(genValue);
  setOnClick();
  toggleOpenClass(sideMenu);
});
typeSelect.addEventListener('change', (e) => {
  e.preventDefault();
  typeValue = e.target.value;
  if (typeValue === '') return;
  searchList.innerHTML = '';
  listLoadType(typeValue);
  setOnClick();
  toggleOpenClass(sideMenu);
})
reset.addEventListener('click', (e) => {
    e.preventDefault();
    searchList.innerHTML = '';
    listLoadGen('all');
    setOnClick();
});
infoX.addEventListener("click", () => {
  toggleHideClass(infoModule);
});

listLoadGen('all');
setOnClick();



const favorites = [];
const favsBtn = document.querySelector('.fav-btn');
const favMenuBtn = document.querySelector('.fav-menu-btn');

favsBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  const value = e.target.value;
  if(!favorites.includes(value)) {
    favorites.push(value);
  }
})
