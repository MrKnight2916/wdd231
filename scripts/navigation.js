const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#site-navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");

  const isOpen = navigation.classList.contains("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.innerHTML = isOpen ? "&times;" : "&#9776;";
});