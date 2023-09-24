const RTOverlay = document.querySelector(".rating-overlay");
const RTSys = document.querySelectorAll(".RateIt");

RTSys.forEach((link) => {
  link.addEventListener("click", (e) => {
    // Prevent the default behavior of the anchor link
    e.preventDefault();

    // Open the overlay player when "Rate It" is clicked
    RTOverlay.classList.add("active");
  });
});

// Add an event listener to prevent the overlay from closing when a star is clicked
const starElements = document.querySelectorAll(".star");
starElements.forEach((star) => {
  star.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the overlay
  });
});

// Add an event listener to close the overlay when the close icon is clicked
const closeIcon = document.querySelector(".close-icon");
closeIcon.addEventListener("click", () => {
  RTOverlay.classList.remove("active");
});

// Add an event listener to close the overlay and save the rating when the submit button is pressed
const submitButton = document.getElementById("btn");
submitButton.addEventListener("click", () => {
  // Get the selected rating value
  const selectedRating = document.querySelector(".selected-rating").textContent;

  // Save the rating (you can replace this with your actual rating saving logic)
  console.log(`Rating Saved: ${selectedRating}`);

  // Close the overlay
  RTOverlay.classList.remove("active");
});
