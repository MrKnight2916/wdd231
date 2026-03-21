// ---------------- WEATHER ----------------

// ⚠️ ReEMPLAZA ESTA API KEY CON LA TUYA
const apiKey = "751db89ea17f2a0c07f0e3d88fae214b";
const lat = 18.4861;
const lon = -69.9312;

const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const currentIcon = document.querySelector("#current-icon");
const feelsLike = document.querySelector("#feels-like");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const forecastContainer = document.querySelector("#forecast");

const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(weatherURL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        if (!data.list || data.list.length === 0) return;

        // Actual
        const today = data.list[0];
        const temp = Math.round(today.main.temp);
        const desc = today.weather[0].description;
        const icon = today.weather[0].icon;
        const feels = Math.round(today.main.feels_like);
        const hum = today.main.humidity;
        const windSpeed = today.wind.speed;

        currentTemp.textContent = `${temp}°C`;
        weatherDesc.textContent = desc;
        currentIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        currentIcon.alt = desc;
        feelsLike.textContent = `Feels like: ${feels}°C`;
        humidity.textContent = `Humidity: ${hum}%`;
        wind.textContent = `Wind: ${windSpeed} m/s`;

        // Pronóstico
        forecastContainer.innerHTML = "";
        for (let i = 8; i <= 24; i += 8) {
            if (!data.list[i]) continue;
            const f = data.list[i];
            const forecastTemp = Math.round(f.main.temp);
            const forecastMin = Math.round(f.main.temp_min);
            const forecastMax = Math.round(f.main.temp_max);
            const forecastDesc = f.weather[0].description;
            const forecastIcon = f.weather[0].icon;

            const date = new Date(f.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            const card = document.createElement("div");
            card.className = "forecast-day";
            card.innerHTML = `
                <p class="day-name">${dayName}</p>
                <img src="https://openweathermap.org/img/wn/${forecastIcon}@2x.png" alt="${forecastDesc}">
                <p class="day-temp">Temp: ${forecastTemp}°C</p>
                <p class="day-minmax">Min: ${forecastMin}°C | Max: ${forecastMax}°C</p>
                <p class="day-desc" style="text-transform:capitalize;">${forecastDesc}</p>
            `;
            forecastContainer.appendChild(card);
        }

    } catch (error) {
        console.error("Weather error:", error);
        currentTemp.textContent = "Weather info not available.";
        weatherDesc.textContent = "";
        currentIcon.src = "";
        feelsLike.textContent = "";
        humidity.textContent = "";
        wind.textContent = "";
        forecastContainer.innerHTML = "";
    }
}

getWeather();

// ---------------- SPOTLIGHT ----------------
const spotlightContainer = document.querySelector("#spotlight-container");
const spotlightsURL = "data/spotlights.json";

async function getSpotlights() {
    try {
        const response = await fetch(spotlightsURL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const featuredMembers = data.filter(member => member.featured);
        const shuffled = featuredMembers.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        displaySpotlights(selected);
    } catch (error) {
        console.error("Spotlight error:", error);
        spotlightContainer.innerHTML = "<p>Spotlights unavailable.</p>";
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        const image = document.createElement("img");
        const name = document.createElement("h4");
        const tagline = document.createElement("p");
        const description = document.createElement("p");
        const category = document.createElement("p");
        const contact = document.createElement("p");
        const socials = document.createElement("p");
        const website = document.createElement("a");

        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";

        name.textContent = member.name;
        tagline.textContent = member.tagline;
        description.textContent = member.description;
        category.textContent = `Category: ${member.category}`;
        contact.textContent = `Contact: ${member.contact}`;

        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";

        let socialsText = "";
        for (const [platform, url] of Object.entries(member.socials)) {
            socialsText += `<a href="${url}" target="_blank">${platform}</a> `;
        }
        socials.innerHTML = socialsText.trim();

        tagline.classList.add("tagline");
        description.classList.add("description");
        category.classList.add("category");
        contact.classList.add("contact");
        socials.classList.add("socials");
        website.classList.add("website");

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(tagline);
        card.appendChild(description);
        card.appendChild(category);
        card.appendChild(contact);
        card.appendChild(socials);
        card.appendChild(website);

        spotlightContainer.appendChild(card);
    });
}

getSpotlights();

// Select all "View Details" buttons
const eventButtons = document.querySelectorAll(".event-link");

eventButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent page reload
        alert("Coming soon!"); // Message shown when clicked
    });
});

const joinBtn = document.querySelector(".cta");
joinBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Join page coming soon!");
});