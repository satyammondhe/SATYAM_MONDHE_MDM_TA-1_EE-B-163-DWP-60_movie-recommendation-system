// Movie Database
const movies = [
  {
    title: "Inception",
    genre: "Sci-Fi",
    rating: 4.8,
    description: "A thief enters dreams to steal secrets.",
    image: "images/movie1.jpg"
  },
  {
    title: "Interstellar",
    genre: "Sci-Fi",
    rating: 4.7,
    description: "A team travels through a wormhole in space.",
    image: "images/movie2.jpg"
  },
  {
    title: "Tenet",
    genre: "Sci-Fi",
    rating: 4.3,
    description: "A secret agent manipulates time.",
    image: "images/movie3.jpg"
  },
  {
    title: "The Matrix",
    genre: "Sci-Fi",
    rating: 4.6,
    description: "A hacker discovers reality is a simulation.",
    image: "images/movie4.jpg"
  },
  {
    title: "The Dark Knight",
    genre: "Action",
    rating: 4.9,
    description: "Batman faces the Joker in Gotham.",
    image: "images/movie5.jpg"
  },
  {
    title: "Avengers: Endgame",
    genre: "Action",
    rating: 4.6,
    description: "Heroes unite to reverse Thanos' snap.",
    image: "images/movie6.jpg"
  },
  {
    title: "Gladiator",
    genre: "Action",
    rating: 4.5,
    description: "A Roman general seeks revenge.",
    image: "images/movie1.jpg"
  },
  {
    title: "John Wick",
    genre: "Action",
    rating: 4.4,
    description: "An ex-hitman seeks vengeance.",
    image: "images/movie2.jpg"
  }
];


// SEARCH FUNCTION
function searchMovie() {
  const input = document.getElementById("searchInput").value;
  localStorage.setItem("searchMovie", input);
  window.location.href = "recommendations.html";
}

// LOAD RECOMMENDATIONS
function loadRecommendations() {
  const container = document.getElementById("movieContainer");
  if (!container) return;

  const search = localStorage.getItem("searchMovie");

  let selectedMovie = movies.find(movie =>
    movie.title.toLowerCase().includes(search?.toLowerCase())
  );

  let recommended;

  if (selectedMovie) {
    recommended = movies.filter(movie =>
      movie.genre === selectedMovie.genre &&
      movie.title !== selectedMovie.title
    );
  } else {
    recommended = [...movies]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6);

  }

  container.innerHTML = "";

  recommended.forEach(movie => {
    container.innerHTML += `
      <div class="card">
        <img src="${movie.image}">
        <div class="card-content">
          <h3>${movie.title}</h3>
          <p>⭐ ${movie.rating}</p>
          <button class="btn" onclick="viewDetails('${movie.title}')">
            View Details
          </button>
        </div>
      </div>
    `;
  });
}

// SAVE SELECTED MOVIE
function viewDetails(title) {
  localStorage.setItem("selectedMovie", title);
  window.location.href = "details.html";
}

// LOAD DETAILS PAGE
function loadDetails() {
  const movieTitle = localStorage.getItem("selectedMovie");
  if (!movieTitle) return;

  const movie = movies.find(m => m.title === movieTitle);
  if (!movie) return;

  document.getElementById("detailsContainer").innerHTML = `
    <img src="${movie.image}">
    <div class="details-info">
      <h1>${movie.title}</h1>
      <p><strong>Genre:</strong> ${movie.genre}</p>
      <p><strong>Rating:</strong> ⭐ ${movie.rating}</p>
      <p>${movie.description}</p>
    </div>
  `;

  // Load Similar Movies
  const similarContainer = document.getElementById("similarMovies");

  let similar = movies.filter(m =>
    m.genre === movie.genre && m.title !== movie.title
  );

  // If less than 6 similar, fill with top rated (dedupe by title)
  if (similar.length < 6) {
    const additional = movies
      .filter(m => m.title !== movie.title)
      .sort((a, b) => b.rating - a.rating);

    const titles = new Set(similar.map(s => s.title));
    for (const a of additional) {
      if (similar.length >= 6) break;
      if (!titles.has(a.title)) {
        similar.push(a);
        titles.add(a.title);
      }
    }
  } else {
    similar = similar.slice(0, 6);
  }

  if (!similarContainer) return;
  similarContainer.innerHTML = "";

  similar.forEach(m => {
    similarContainer.innerHTML += `
      <div class="card">
        <img src="${m.image}">
        <div class="card-content">
          <h3>${m.title}</h3>
          <p>⭐ ${m.rating}</p>
          <button class="btn" onclick="viewDetails('${m.title}')">
            View Details
          </button>
        </div>
      </div>
    `;
  });
}

// Run on Page Load
window.onload = function () {
  loadRecommendations();
  loadDetails();
};
