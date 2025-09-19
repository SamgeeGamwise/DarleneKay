document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const menuButton = document.getElementById("menu-button");
  const menuIcon = document.getElementById("menu-button-icon");
  const mobileSubmenuToggles = document.querySelectorAll("[data-mobile-submenu-toggle]");
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
    const collapseSubmenu = (toggle) => {
      if (!toggle) return;
      const targetId = toggle.getAttribute("aria-controls");
      if (!targetId) return;
      const submenu = document.getElementById(targetId);
      if (submenu && !submenu.classList.contains("hidden")) {
        submenu.classList.add("hidden");
      }
      toggle.setAttribute("aria-expanded", "false");
      toggle.classList.remove("is-open");
    };

    const collapseAllSubmenus = (exception) => {
      mobileSubmenuToggles.forEach((toggle) => {
        if (toggle === exception) return;
        collapseSubmenu(toggle);
      });
    };

    const openMenu = () => {
      menu.classList.remove("hidden");
      menuButton.setAttribute("aria-expanded", "true");
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-xmark");
    };

    const closeMenu = () => {
      if (menu.classList.contains("hidden")) {
        return;
      }
      menu.classList.add("hidden");
      menuButton.setAttribute("aria-expanded", "false");
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
      collapseAllSubmenus();
    };

    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();
      if (menu.classList.contains("hidden")) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    mobileSubmenuToggles.forEach((toggle) => {
      const targetId = toggle.getAttribute("aria-controls");
      const submenu = targetId ? document.getElementById(targetId) : null;

      if (!submenu) {
        return;
      }

      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const isHidden = submenu.classList.contains("hidden");

        if (isHidden) {
          collapseAllSubmenus(toggle);
          submenu.classList.remove("hidden");
          toggle.setAttribute("aria-expanded", "true");
          toggle.classList.add("is-open");
        } else {
          submenu.classList.add("hidden");
          toggle.setAttribute("aria-expanded", "false");
          toggle.classList.remove("is-open");
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
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
