/* Class Variables */
const hideClass = "hide";
const openClass = "open";
/* Element variables */
const sideMenu = document.querySelector("#sideMenu");
const sideMenuSwitches = document.querySelectorAll(".menu-btn");
const headMenuSwitch = document.querySelector(".menu-btn.head");
const menuLinks = document.querySelectorAll(".menu-link");
const homeView = document.querySelector(".home-box");
/* Handle hide class */
function toggleHideClass(ele) {
  !ele.className.includes(hideClass)
    ? ele.classList.add(hideClass)
    : ele.classList.remove(hideClass);
}
/* Handle open class */
function toggleOpenClass(ele) {
  !ele.className.includes(openClass)
    ? ele.classList.add(openClass)
    : ele.classList.remove(openClass);
}
/* Handle switch behavior */
sideMenuSwitches.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleOpenClass(sideMenu);
  });
});

/* Handle link behavior */
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!homeView.className.includes(hideClass)) {
      toggleHideClass(homeView);
      toggleHideClass(headMenuSwitch);
    }

    toggleOpenClass(sideMenu);
  });
});
