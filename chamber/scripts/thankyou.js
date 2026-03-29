document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);

  function getValue(param) {
    return params.get(param) || "N/A";
  }

  document.getElementById("fname").textContent = getValue("fname");
  document.getElementById("lname").textContent = getValue("lname");
  document.getElementById("email").textContent = getValue("email");
  document.getElementById("phone").textContent = getValue("phone");
  document.getElementById("business").textContent = getValue("business");
  document.getElementById("timestamp").textContent = getValue("timestamp");

});