const headings = document.querySelectorAll("h2[data-text]");

headings.forEach((heading) => {
  const text = heading.getAttribute("data-text");
  let index = 0;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && index === 0) {
        const interval = setInterval(() => {
          heading.textContent = text.slice(0, index + 1);
          index++;
          if (index === text.length) {
            clearInterval(interval);
          }
        }, 80);
      }
    });
  });

  observer.observe(heading);
});
