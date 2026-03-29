// navigation.js
const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    // Actualiza atributo aria-expanded
    const isOpen = navMenu.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);

    // Cambia el ícono del botón
    menuButton.innerHTML = isOpen ? "&times;" : "&#9776;";
});

// Opcional: cerrar el menú al hacer click en un enlace
const navLinks = navMenu.querySelectorAll("a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu.classList.contains("open")) {
            navMenu.classList.remove("open");
            menuButton.setAttribute("aria-expanded", false);
            menuButton.innerHTML = "&#9776;";
        }
    });
});