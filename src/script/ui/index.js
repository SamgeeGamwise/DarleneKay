// Navbar
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

// Carousel Logic
function createCarousel(carouselId, interval = 4000) {
  const carousel = document.getElementById(carouselId);
  const items = Array.from(carousel.querySelectorAll(".carousel__item"));
  const prevButton = carousel.querySelector(".carousel__btn--prev");
  const nextButton = carousel.querySelector(".carousel__btn--next");

  let currentIndex = 0;
  let timer;

  function showItem(index) {
    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  function next() {
    const newIndex = (currentIndex + 1) % items.length;
    showItem(newIndex);
  }

  function prev() {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(newIndex);
  }

  function startAutoplay() {
    timer = setInterval(next, interval);
  }

  function stopAutoplay() {
    clearInterval(timer);
  }

  // Event listeners
  nextButton.addEventListener("click", () => {
    next();
    stopAutoplay();
    startAutoplay();
  });

  prevButton.addEventListener("click", () => {
    prev();
    stopAutoplay();
    startAutoplay();
  });

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  // Init
  showItem(currentIndex);
  startAutoplay();
}

// Initialize both
// createCarousel("carousel-images");
createCarousel("carousel-text", 5000); // slower for text if you want