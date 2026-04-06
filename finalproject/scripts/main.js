//////////////////////////////
// scripts/main.js
//////////////////////////////

async function initMovies() {
  try {
    const response = await fetch('data/movies.json');
    if (!response.ok) throw new Error('Failed to fetch movies JSON');
    const movies = await response.json();

    if (document.querySelector('#spotlight')) displaySpotlight(movies);
    if (document.querySelector('#movies-container')) displayMovieCards(movies);
    if (document.querySelector('#favorites')) loadFavorites(movies);

    // Inicializar formulario solo en favorites.html
    if (document.querySelector('#add-fav-form')) initAddFavoriteForm(movies);

  } catch (error) {
    console.error('Error loading movies:', error);
    const container = document.querySelector('#movies-container');
    if (container) container.innerHTML = `<p class="error">Failed to load movies. Please try again later.</p>`;
  }
}

function displaySpotlight(movies) {
  const spotlightContainer = document.querySelector('#spotlight');
  if (!spotlightContainer) return;

  spotlightContainer.innerHTML = '';
  const shuffled = [...movies].sort(() => 0.5 - Math.random());
  const spotlightMovies = shuffled.slice(0, 3);

  spotlightMovies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'spotlight-card';
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title} poster">
      <h3>${movie.title} (${movie.year})</h3>
      <p>${movie.genre}</p>
      <button class="details-btn" data-title="${movie.title}">View Details</button>
      <button class="favorite-btn" data-title="${movie.title}">❤</button>
    `;
    spotlightContainer.appendChild(card);
  });

  attachCardEvents(spotlightContainer, movies);
}

function displayMovieCards(movies) {
  const container = document.querySelector('#movies-container');
  if (!container) return;

  container.innerHTML = '';
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title} poster">
      <h3>${movie.title} (${movie.year})</h3>
      <p>${movie.genre}</p>
      <button class="details-btn" data-title="${movie.title}">View Details</button>
      <button class="favorite-btn" data-title="${movie.title}">❤</button>
    `;
    container.appendChild(card);
  });

  attachCardEvents(container, movies);
}

function attachCardEvents(container, movies) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  container.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const movie = movies.find(m => m.title === btn.dataset.title);
      if (movie) openModal(movie);
    });
  });

  container.querySelectorAll('.favorite-btn').forEach(btn => {
    const title = btn.dataset.title;
    if (favorites.includes(title)) btn.classList.add('active');
    btn.addEventListener('click', () => toggleFavorite(title, btn, movies));
  });
}

function openModal(movie) {
  const modal = document.querySelector('#modal');
  if (!modal) return;

  const modalContent = modal.querySelector('.modal-content');
  modalContent.innerHTML = `
    <span class="close">&times;</span>
    <h2>${movie.title} (${movie.year})</h2>
    <img src="${movie.poster}" alt="${movie.title} poster">
    <p><strong>Genre:</strong> ${movie.genre}</p>
    <p>${movie.description || ''}</p>
  `;

  modal.style.display = 'flex';

  modalContent.querySelector('.close').addEventListener('click', () => modal.style.display = 'none');

  window.addEventListener('click', function clickOutside(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      window.removeEventListener('click', clickOutside);
    }
  });
}

function toggleFavorite(title, btn, movies) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favorites.includes(title)) {
    favorites = favorites.filter(f => f !== title);
    if(btn) btn.classList.remove('active');
  } else {
    favorites.push(title);
    if(btn) btn.classList.add('active');
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  if (document.querySelector('#favorites')) loadFavorites(movies);
}

// Cargar favoritos con poster, título y botón de remover
function loadFavorites(movies) {
  const favContainer = document.querySelector('#favorites');
  if (!favContainer) return;

  favContainer.innerHTML = '';
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    favContainer.innerHTML = '<p>No favorites yet. Click ❤ to add movies.</p>';
    return;
  }

  favorites.forEach(title => {
    const movie = movies.find(m => m.title.toLowerCase() === title.toLowerCase());
    const card = document.createElement('div');
    card.className = 'fav-card';
    if (movie) {
      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title} poster">
        <h3>${movie.title} (${movie.year})</h3>
        <button class="remove-fav-btn" data-title="${movie.title}">Remove ❤</button>
      `;
    } else {
      card.innerHTML = `
        <h3>${title}</h3>
        <button class="remove-fav-btn" data-title="${title}">Remove ❤</button>
      `;
    }
    favContainer.appendChild(card);

    card.querySelector('.remove-fav-btn').addEventListener('click', () => {
      toggleFavorite(title, card.querySelector('.remove-fav-btn'), movies);
    });
  });
}

// NUEVO: Formulario simplificado solo barra de título
function initAddFavoriteForm(movies) {
  const form = document.querySelector('#add-fav-form');
  const input = document.querySelector('#fav-title');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = input.value.trim();
    if (!title) return;

    // Buscar en JSON para poster, year y genre
    const movie = movies.find(m => m.title.toLowerCase() === title.toLowerCase());
    const newMovie = movie || { title, year: '', genre: '', poster: 'assets/default-poster.png' };

    // Guardar en localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(f => f.toLowerCase() === title.toLowerCase())) {
      favorites.push(newMovie.title);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Guardar datos completos para persistencia
    let customMovies = JSON.parse(localStorage.getItem('customMovies')) || [];
    if (!customMovies.some(m => m.title.toLowerCase() === newMovie.title.toLowerCase())) {
      customMovies.push(newMovie);
      localStorage.setItem('customMovies', JSON.stringify(customMovies));
      movies.push(newMovie); // agregamos al array principal
    }

    loadFavorites(movies);
    input.value = '';
  });

  // Cargar favoritos personalizados al iniciar
  let customMovies = JSON.parse(localStorage.getItem('customMovies')) || [];
  customMovies.forEach(m => {
    if (!movies.some(movie => movie.title.toLowerCase() === m.title.toLowerCase())) movies.push(m);
  });
}

document.addEventListener('DOMContentLoaded', initMovies);