//////////////////////////////
// scripts/main.js
//////////////////////////////

async function initMovies() {
  try {
    const response = await fetch('data/movies.json');
    if (!response.ok) throw new Error('Failed to fetch movies JSON');
    const movies = await response.json();

    displaySpotlight(movies);
    displayMovieCards(movies);
    loadFavorites(movies); // ahora pasamos todas las películas

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
    <p>${movie.description}</p>
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
    btn.classList.remove('active');
  } else {
    favorites.push(title);
    btn.classList.add('active');
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  loadFavorites(movies); // recargar favoritos
}

// NUEVO: mostrar favoritos con poster, título y botón
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
    const movie = movies.find(m => m.title === title);
    if (!movie) return;

    const card = document.createElement('div');
    card.className = 'fav-card';
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title} poster">
      <h3>${movie.title} (${movie.year})</h3>
      <button class="remove-fav-btn" data-title="${movie.title}">Remove ❤</button>
    `;
    favContainer.appendChild(card);

    // evento para quitar favorito
    card.querySelector('.remove-fav-btn').addEventListener('click', () => {
      toggleFavorite(movie.title, card.querySelector('.remove-fav-btn'), movies);
    });
  });
}

document.addEventListener('DOMContentLoaded', initMovies);