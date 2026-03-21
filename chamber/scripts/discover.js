const visitMessage = document.querySelector("#visit-message");

// Obtener la última visita
const lastVisit = localStorage.getItem("lastVisit");

// Obtener fecha actual en milisegundos
const now = Date.now();

let message;

// Si NO hay visita previa
if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";

} else {
    // Calcular diferencia en milisegundos
    const timeDifference = now - lastVisit;

    // Convertir a días
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
        message = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${daysDifference} days ago.`;
    }
}

// Mostrar mensaje
visitMessage.textContent = message;

// Guardar la visita actual
localStorage.setItem("lastVisit", now);