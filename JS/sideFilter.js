let originalMovieOrder = [];
function storeOriginalOrder() {
  const movieList = document.querySelector(".movie-list");
  originalMovieOrder = Array.from(movieList.querySelectorAll(".movie-item"));
}

// Call this function to restore the original order
function restoreOriginalOrder() {
  const movieList = document.querySelector("#movie-list");
  originalMovieOrder.forEach((item) => movieList.appendChild(item));
}

function sortMovies(sortOrder) {
  const movieList = document.querySelector("#movie-list");
  const movieItems = Array.from(movieList.querySelectorAll(".movie-item"));

  if (sortOrder === "default") {
    restoreOriginalOrder();
  } else if (sortOrder === "highest_year") {
    movieItems.sort((a, b) => {
      const yearA = parseInt(a.querySelector(".movie-year-text").textContent);
      const yearB = parseInt(b.querySelector(".movie-year-text").textContent);

      return yearB - yearA;
    });

    movieItems.forEach((item) => movieList.appendChild(item));
  } else if (sortOrder === "lowest_year") {
    movieItems.sort((a, b) => {
      const yearA = parseInt(a.querySelector(".movie-year-text").textContent);
      const yearB = parseInt(b.querySelector(".movie-year-text").textContent);

      return yearA - yearB;
    });

    movieItems.forEach((item) => movieList.appendChild(item));
  } else {
    // Sorting by rating
    movieItems.sort((a, b) => {
      const ratingA = parseFloat(a.getAttribute("data-rating"));
      const ratingB = parseFloat(b.getAttribute("data-rating"));

      if (sortOrder === "highest") {
        return ratingB - ratingA;
      } else if (sortOrder === "lowest") {
        return ratingA - ratingB;
      }
    });

    movieItems.forEach((item) => movieList.appendChild(item));
  }
}
window.onload = function () {
  // Step 2: Call function on page load
  storeOriginalOrder();
};
