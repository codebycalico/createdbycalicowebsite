/* 
    calico rose's website - createdbycalico.com
    created for the landing / homepage to animate the header texts when hovered over.
    on the technology section - a typewriter terminal effect.
    on the photography section - a gentle bounce / fade animation.
*/

// technology section
const label = document.querySelector(".tech .split-label");
const text = label.getAttribute("data-text");
let interval = null;
let index = 0;

function startTyping() {
  // prevents restarting mid-type if the mouse triggers multiple times
  if (index > 0) return;
  // clear right when triggered
  label.textContent = "";
  interval = setInterval(() => {
    label.textContent = text.slice(0, index + 1) + "_";
    index++;
    if (index === text.length) {
      clearInterval(interval);
      label.textContent = text;
      // after the typewriter animation is completed, the JS script passes the "_" animation to the CSS
      label.classList.add("cursor");
    }
  }, 80);
}

// restores full text
function resetLabel() {
  clearInterval(interval);
  index = 0;
  label.textContent = text;
  label.classList.remove("cursor");
}

// this is what is always active on the page
const techSide = document.querySelector(".split.tech");
label.textContent = text;
techSide.addEventListener("mouseenter", startTyping);
techSide.addEventListener("mouseleave", resetLabel);

// photography section
const photoLabel = document.querySelector(".photography .split-label");
const photoText = photoLabel.textContent;
photoLabel.innerHTML = photoText
  .split("")
  .map((char, i) => `<span style="animation-delay: ${i * 40}ms">${char}</span>`)
  .join("");

const photoSide = document.querySelector(".split.photography");
photoSide.addEventListener("mouseenter", () => {
  photoLabel.classList.add("floating");
});

// make the animation complete when the mouse leaves instead of cutting it off
photoSide.addEventListener("mouseleave", () => {
  const lastSpan = photoLabel.querySelectorAll("span")[photoText.length - 1];
  lastSpan.addEventListener(
    "animationend",
    () => {
      photoLabel.classList.remove("floating");
    },
    { once: true },
  );
});
