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