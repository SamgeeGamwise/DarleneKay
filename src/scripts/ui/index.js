document.getElementById("menu-button").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("hidden");

  const buttonIcon = document.getElementById("menu-button-icon");
  buttonIcon.classList.toggle("fa-xmark");
  buttonIcon.classList.toggle("fa-bars");
});

document.addEventListener("click", (e) => {
  const menu = document.getElementById("menu");
  const button = document.getElementById("menu-button");
  const buttonIcon = document.getElementById("menu-button-icon");

  if (!menu.contains(e.target) && !button.contains(e.target) && !menu.classList.contains("hidden")) {
    menu.classList.add("hidden");
    buttonIcon.classList.toggle("fa-xmark");
    buttonIcon.classList.toggle("fa-bars");
  }
});

const animationElements = [];

// scroll-animations.js
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.3 } // trigger when 20% visible
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
});
