const root = document.documentElement;
/* sideMenu */
const sideMenu = document.querySelector("#sideMenu");
const sideMenuSwitches = document.querySelectorAll(".menu-btn");
const headMenuSwitch = document.querySelector(".menu-btn.head");
const filterSelects = document.querySelectorAll(".filter-select");
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

filterSelects.forEach((select) => {
  select.addEventListener("change", () => {
    toggleOpenClass(sideMenu);
  }) 
})

/* bannerMarquee */
const marqueeContent = document.querySelector("ul.marquee-content");
const marqueeLength = marqueeContent.children.length;
root.style.setProperty("--marquee-elms", marqueeLength);

for (let i = 0; i < marqueeLength; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
