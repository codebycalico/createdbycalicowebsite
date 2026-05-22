// create a typewriter effect when mouse hovers over the specified doc object.

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
