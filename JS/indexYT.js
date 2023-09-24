// Ensure the DOM content is loaded before running the JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const YTOverlay = document.querySelector(".youtube-overlay");
  const YTLinks = document.querySelectorAll(".youtube");

  // Check if YTOverlay and YTLinks are found
  if (!YTOverlay || YTLinks.length === 0) {
    console.error("YouTube overlay or links not found.");
    return;
  }

  // Loop through each .youtube element and add a click event listener
  YTLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior

      // Open the overlay player when "Play Trailer" is clicked
      YTOverlay.classList.add("active");
    });
  });

  // Add an event listener to close the overlay when the overlay itself is clicked
  YTOverlay.addEventListener("click", (event) => {
    // Check if the click occurred inside the overlay content
    if (event.target === YTOverlay) {
      YTOverlay.classList.remove("active");
    }
  });
});
