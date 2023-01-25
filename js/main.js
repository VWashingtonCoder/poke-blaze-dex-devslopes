root.style.setProperty("--marquee-elms", marqueeLength);
for (let i = 0; i < marqueeLength; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

infoX.addEventListener("click", () => {
  toggleOpenClass(infoModule);
});




