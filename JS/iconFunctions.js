document.addEventListener("DOMContentLoaded", function () {
  // Get a NodeList of all the "Add Favorite" icons
  var addFavoriteIcons = document.querySelectorAll(".AddFavorite i");

  // Add a click event listener to each "Add Favorite" icon
  addFavoriteIcons.forEach(function (icon) {
    icon.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default behavior of the anchor tag

      // Toggle the class of the heart icon
      if (icon.classList.contains("fa-heart-circle-plus")) {
        icon.classList.remove("fa-heart-circle-plus");
        icon.classList.add("fa-heart", "red-heart"); // Add the red-heart class
      } else {
        icon.classList.remove("fa-heart", "red-heart"); // Remove the red-heart class
        icon.classList.add("fa-heart-circle-plus");
      }

      // You can add your favorite logic here
      // For example, you can send a request to a server to mark the movie as a favorite
    });
  });
});

/* ----------------------------------WatchList Button----------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  // Get a NodeList of all the "Add to Watchlist" icons
  var watchlistIcons = document.querySelectorAll(".watchlist i");

  // Add a click event listener to each "Add to Watchlist" icon
  watchlistIcons.forEach(function (icon) {
    icon.parentElement.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default behavior of the anchor tag

      // Toggle the class of the watchlist icon
      if (icon.classList.contains("bx-list-plus")) {
        icon.classList.remove("bx-list-plus");
        icon.classList.add("bx-list-check");
      } else {
        icon.classList.remove("bx-list-check");
        icon.classList.add("bx-list-plus");
      }

      // You can add your watchlist logic here
      // For example, you can add or remove the movie from the watchlist
    });
  });
});
