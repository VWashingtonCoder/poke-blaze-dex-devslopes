const root = document.documentElement;
/* Class Variables */
const hideClass = "hide";
const openClass = "open";
/* Element Variables */
const sideMenu = document.querySelector("#sideMenu");
const sideMenuSwitches = document.querySelectorAll(".menu-btn");
const headMenuSwitch = document.querySelector(".menu-btn.head");
const menuLinks = document.querySelectorAll(".menu-link");
const homeView = document.querySelector(".home-box");
// handle hide class
function toggleHideClass(ele) {
  !ele.className.includes(hideClass)
    ? ele.classList.add(hideClass)
    : ele.classList.remove(hideClass);
}
// Handle open class
function toggleOpenClass(ele) {
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
// link behavior
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!homeView.className.includes(hideClass)) {
      toggleHideClass(homeView);
      toggleHideClass(headMenuSwitch);
    }
    toggleOpenClass(sideMenu);
  });
});
/* Handle marquee animation */
const marqueeContent = document.querySelector("ul.marquee-content");
const marqueeLength = marqueeContent.children.length;
root.style.setProperty("--marquee-elms", marqueeLength);

for (let i = 0; i < marqueeLength; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
