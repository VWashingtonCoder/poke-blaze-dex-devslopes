const root = document.documentElement;
/* Menu Operator */
const sideMenu = document.querySelector("#sideMenu");
const sideMenuSwitches = document.querySelectorAll(".menu-btn");
const headMenuSwitch = document.querySelector(".menu-btn.head");
// handle hide class
function toggleHideClass(ele) {
  const hideClass = "hide";

  !ele.className.includes(hideClass)
    ? ele.classList.add(hideClass)
    : ele.classList.remove(hideClass);
}
// Handle open class
function toggleOpenClass(ele) {
  const openClass = "open";

  !ele.className.includes(openClass)
    ? ele.classList.add(openClass)
    : ele.classList.remove(openClass);
}
// Handle menu open/close
sideMenuSwitches.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleOpenClass(sideMenu);
  });
});

/* API Calls */
async function getAllPokemon() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=1008&offset=0";

  try {
    let res = await fetch(url);
    let data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
}
// ID Handler
function generateDexId(id) {
  let dexId = "";

  if (id < 10) dexId = "00" + id;
  else if (id >= 10 && id < 100) dexId = "0" + id;
  else dexId = id.toString();

  return dexId;
}

/* Handle marquee animation */
const marqueeContent = document.querySelector("ul.marquee-content");
const marqueeLength = marqueeContent.children.length;
root.style.setProperty("--marquee-elms", marqueeLength);

for (let i = 0; i < marqueeLength; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
