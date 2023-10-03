const YTOverlay = document.querySelector(".youtube-overlay");
const YTLinks = document.querySelectorAll(".playTrailer");

YTLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Open the overlay player when "Play Trailer" is clicked
    YTOverlay.classList.add("active");
  });
});

// Add an event listener to close the overlay when the overlay itself is clicked
YTOverlay.addEventListener("click", () => {
  YTOverlay.classList.remove("active");
});
