root.style.setProperty("--marquee-elms", marqueeLength);
for (let i = 0; i < marqueeLength; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
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
favsBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  const value = e.target.value;
  if(!favorites.includes(value)) {
    favorites.push(value);
  }
})
favMenuBtn.addEventListener('click', () => {
  const favoritesLength = favorites.length;
  searchList.innerHTML = '';
  loadSearchHeader('Favorite', favoritesLength)
  favorites.sort();
  favorites.forEach(fav => {
    const splitFav = fav.split(' ');
    const dexId = splitFav[0];
    const name = splitFav[1];

    loadSearchList(name, dexId);
  })
  setOnClick();
})

/*Initial Load*/
listLoadGen('all');
setOnClick();