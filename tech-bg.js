/* 
    calico rose's website - createdbycalico.com
    Matrix rain script for the technology section background on the landing page.
    Reference: https://dev.to/javascriptacademy/matrix-raining-code-effect-using-javascript-4hep
*/

const canvas = document.getElementById("tech-canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const chars = "000111アイウエオカキクケコ";
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
// start the drops at a random place above the page so they all drop at separate / random times
const drops = Array.from({ length: columns }, () => Math.random() * -50);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ea70ec";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

// call the function every # milliseconds
setInterval(draw, 50);
