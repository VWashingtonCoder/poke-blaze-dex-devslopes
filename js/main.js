/* bannerMarquee */
const root = document.documentElement;
const marqueeContent = document.querySelector("ul.marquee-content");
const marqueeLength = marqueeContent.children.length;

root.style.setProperty("--marquee-elms", marqueeLength);

for (let i = 0; i < marqueeLength; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
/* Universal Handlers */
function toggleHideClass(ele) {
  const hideClass = "hide";
  !ele.className.includes(hideClass)
    ? ele.classList.add(hideClass)
    : ele.classList.remove(hideClass);
}
function toggleOpenClass(ele) {
  const openClass = "open";
  !ele.className.includes(openClass)
    ? ele.classList.add(openClass)
    : ele.classList.remove(openClass);
}



