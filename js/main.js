/* Class Variables */
const hide = "hide";
/* Side Menu Variables */
const sideMenuSwitches = document.querySelectorAll(".menu-btn");
const sideMenu = document.querySelector("#sideMenu");
const sideMenuList = document.querySelector(".menu");

// Handle menu open/close
sideMenuSwitches.forEach((btn) => {
  btn.addEventListener("click", () => {
    !sideMenu.className.includes("open")
      ? sideMenu.classList.add("open")
      : sideMenu.classList.remove("open");
  });
});

// handle hide class
function toggleHideClass(ele) {
  const hideClass = "hide";

  !ele.classList.includes(hideClass)
    ? ele.classList.add(hideClass)
    : ele.classList.remove(hideClass);
}

// link behavior
const menuLinks = document.querySelectorAll("menu-links");
