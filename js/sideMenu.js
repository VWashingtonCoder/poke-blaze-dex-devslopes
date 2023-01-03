const menuData = [
  ["favs", "Favorites List"],
  ["gen1", "Gen 1 (#001 - #151)"],
  ["gen2", "Gen 2 (#152 - #251)"],
  ["gen3", "Gen 3 (#252 - #386)"],
  ["gen4", "Gen 4 (#387 - #493)"],
  ["gen5", "Gen 5 (#494 - #649)"],
  ["gen6", "Gen 6 (#650 - #721)"],
  ["gen7", "Gen 7 (#722 - #809)"],
  ["gen8", "Gen 8 (#810 - #905)"],
  ["gen9", "Gen 9 (#906 - #1010)"]
];
const sideMenuSwitches = document.querySelectorAll(".menu-btn");
const sideMenu = document.querySelector("#sideMenu");
const sideMenuList = document.querySelector(".menu");

menuData.forEach((link) => {
  const menuClass = link[0];
  const menuText = link[1];
  const menuLink = document.createElement("a");

  menuLink.classList.add("menu-link");
  menuLink.classList.add(menuClass);
  menuLink.innerHTML = menuText;

  sideMenuList.appendChild(menuLink);
});

sideMenuSwitches.forEach((btn) => {
  btn.addEventListener("click", () => {
    !sideMenu.className.includes("open")
      ? sideMenu.classList.add("open")
      : sideMenu.classList.remove("open");
  });
});