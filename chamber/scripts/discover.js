import { places } from "../data/discover.mjs";

const visitMessage = document.querySelector("#visit-message");

// LocalStorage logic
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

let message;

if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = now - lastVisit;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
        message = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${daysDifference} days ago.`;
    }
}

visitMessage.textContent = message;
localStorage.setItem("lastVisit", now);

// Footer
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();

currentYear.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

// Cards
const cardsContainer = document.querySelector("#cards-container");

function createCards(places) {
    places.forEach(place => {
        const card = document.createElement("div");
        card.classList.add("card");

        // 🔥 TITLE (arriba SIEMPRE)
        const title = document.createElement("h3");
        title.textContent = place.name;

        // 🔥 IMAGE
        const img = document.createElement("img");
        img.src = place.image;
        img.alt = place.name;
        img.loading = "lazy";

        // 🔥 ADDRESS
        const address = document.createElement("p");
        address.textContent = place.address;

        // 🔥 DESCRIPTION
        const description = document.createElement("p");
        description.textContent = place.description;

        // 🔥 EXTRA INFO
        const hours = document.createElement("p");
        hours.textContent = `Hours: ${place.hours}`;

        const cost = document.createElement("p");
        cost.textContent = `Cost: ${place.cost}`;

        // 🔥 BUTTON (MEJORADO)
        const button = document.createElement("button");
        button.textContent = "Learn More";

        button.addEventListener("click", () => {
            const query = encodeURIComponent(place.name + " " + place.address);
            window.open(`https://www.google.com/search?q=${query}`, "_blank");
        });

        // 🔥 ORDEN CORRECTO (SOLUCIONA TU PROBLEMA)
        card.appendChild(title);
        card.appendChild(img);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(hours);
        card.appendChild(cost);
        card.appendChild(button);

        cardsContainer.appendChild(card);
    });
}

createCards(places);