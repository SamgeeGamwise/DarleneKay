document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const menuButton = document.getElementById("menu-button");
  const menuIcon = document.getElementById("menu-button-icon");
  const carousel = document.getElementById("carousel-text");

  let items;
  let prevButton;
  let nextButton;

  if (carousel) {
    items = Array.from(carousel.querySelectorAll(".carousel__item"));
    prevButton = carousel.querySelector(".carousel__btn--prev");
    nextButton = carousel.querySelector(".carousel__btn--next");
  }

  /*
  **********************************************
  Navbar mobile open/close
  **********************************************
  */
  if (menuButton && menu && menuIcon) {
    menuButton.addEventListener("click", () => {
      menu.classList.toggle("hidden");

      // swap icon between bars and xmark
      if (menu.classList.contains("hidden")) {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
      } else {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
      }
    });

    document.addEventListener("click", (e) => {
      if (
        !menu.contains(e.target) &&
        !menuButton.contains(e.target) &&
        !menu.classList.contains("hidden")
      ) {
        menu.classList.add("hidden");
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
      }
    });
  }

  /*
  **********************************************
  Animate on scroll
  **********************************************
  */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  /*
  **********************************************
  Carousel Logic
  **********************************************
  */
  if (carousel) {
    let currentIndex = 0;
    let timer;
    const interval = 4000; // autoplay interval in ms

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
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        next();
        stopAutoplay();
        startAutoplay();
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        prev();
        stopAutoplay();
        startAutoplay();
      });
    }

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    // Init
    showItem(currentIndex);
    startAutoplay();
  }
});
