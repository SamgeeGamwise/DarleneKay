document.getElementById("menuButton").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  const menu = document.getElementById("menu");
  const button = document.getElementById("menuButton");
  if (!menu.contains(e.target) && !button.contains(e.target)) {
    menu.classList.add("hidden");
  }
});