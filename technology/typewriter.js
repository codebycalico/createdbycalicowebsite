/* 
  calico rose's website - createdbycalico.com
  typewriter effect for the headers on the technology page
  references: https://www.w3schools.com/howto/howto_js_typewriter.asp
  https://codepen.io/Lerke/pen/MWPOKZj
*/

// select all document objects that match what's in the quotes (every h2 that has a data-text attribute)
const headings = document.querySelectorAll("h2[data-text]");

headings.forEach((heading) => {
  const text = heading.getAttribute("data-text");
  let index = 0;

  // intersection observer tracks what is visible in the viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // only do the animation once the header is in view,
      // not done all immediately when the page loads.
      if (entry.isIntersecting && index === 0) {
        const interval = setInterval(() => {
          // slices the text up from the full string, growing one char each time
          heading.textContent = text.slice(0, index + 1);
          index++;
          if (index === text.length) {
            // stop timer when text is fully written
            clearInterval(interval);
          }
          // variable is the milliseconds between each character - lower for faster, raise for slower typing
        }, 80);
      }
    });
  });

  observer.observe(heading);
});
