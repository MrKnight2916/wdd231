document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // TIMESTAMP
  // ==========================
  const timestampField = document.getElementById("timestamp");

  if (timestampField) {
    const now = new Date();
    timestampField.value = now.toISOString();
  }

  // ==========================
  // MODALS
  // ==========================
  const modalLinks = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close");

  // OPEN MODAL
  modalLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = link.getAttribute("data-modal");
      const modal = document.getElementById(modalId);

      if (modal) {
        modal.style.display = "block";
      }
    });
  });

  // CLOSE BUTTON
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").style.display = "none";
    });
  });

  // CLOSE OUTSIDE CLICK
  window.addEventListener("click", (e) => {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });

});