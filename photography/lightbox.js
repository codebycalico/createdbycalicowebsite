/* 
    calico rose's website - createdbycalico.com
    lightbox feature for the photography gallery. makes images large when clicking on them.
    References: 
        https://stackoverflow.com/questions/68998332/simple-lightbox-with-css-and-jquery
        https://forum.bootstrapstudio.io/t/do-you-have-a-favorite-vanilla-javascript-lightbox/10218
*/

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");

// keeps track of all images in the grid and their order
const images = Array.from(document.querySelectorAll(".photo-grid img"));
let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("active");
  });
});

// creates a loop so once all the images have been gone through, it loops back to the first
function showImage(index) {
  currentIndex = (index + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
  lightboxImg.alt = images[currentIndex].alt;
}

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
  // prevents from firing unless the image has been clicked on
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") lightbox.classList.remove("active");
  if (e.key === "ArrowRight") showImage(currentIndex + 1);
  if (e.key === "ArrowLeft") showImage(currentIndex - 1);
});

// swipe support for moobile / touchpad devices to move through the gallery images
let touchStartX = 0;

lightbox.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) showImage(currentIndex + 1);
    else showImage(currentIndex - 1);
  }
});
