const bigStar = document.querySelector(".big-star i");
const stars = document.querySelectorAll(".star");
const ratingText = document.querySelector(".selected-rating");
const feedbackMessage = document.querySelector(".feedback-message");
const btn = document.querySelector(".rating-button");

//Loop through each star
stars.forEach((star) => {
  //Add mouseenter event to each star
  star.addEventListener("mouseenter", handleHover);
  //Add mouseleave event to each star
  star.addEventListener("mouseleave", handleLeave);
  //Add mouseclick event to each star
  star.addEventListener("click", handleClick);
});

//Variable to hold the rating value
let rating;

//Function for highlithing the star
function highlithingStars(rating) {
  //Loop through all stars
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("selected");
    } else {
      star.classList.remove("selected");
    }
  });
}

//Switch between each rating message
function getFeedbackMessage(rating) {
  switch (rating) {
    case "1":
      return `<h2>Terrible. I'd rather watch paint dry.</h2>`;

    case "2":
      return `<h2>Disappointing. I expected more plot twists, less eye-rolls.</h2>`;

    case "3":
      return `<h2>Below Average. About as thrilling as a slow elevator ride.</h2>`;

    case "4":
      return `<h2>Average. Popcorn was the highlight.</h2>`;

    case "5":
      return `<h2>Good. I'd give it a high-five.</h2>`;

    case "6":
      return `<h2>Great. My cat even stayed awake. </h2>`;

    case "7":
      return `<h2>Impressive. My jaw dropped more than once.</h2>`;

    case "8":
      return `<h2>Exceptional. It's my new favorite excuse to procrastinate.</h2>`;

    case "9":
      return `<h2>Fantastic. My expectations are now in therapy.</h2>`;

    case "10":
      return `<h2>Masterpiece. I've started a fan club!</h2>`;

    default:
      return "";
  }
}

//Fuction for the mouseenter (hover) event
function handleHover(e) {
  const rating = e.currentTarget.getAttribute("data-value");
  highlithingStars(rating);
}

function handleLeave() {
  highlithingStars(rating);
}

function handleClick(e) {
  button = document.getElementById("btn");
  button.style.display = "block";
  button.add;
  rating = e.currentTarget.getAttribute("data-value");
  bigStar.style.fontSize = `${1 + rating * 0.1}em`;
  ratingText.textContent = rating;
  feedbackMessage.innerHTML = getFeedbackMessage(rating);
  console.log(getFeedbackMessage(rating));
  feedbackMessage.style.visibility = "visible";
  feedbackMessage.style.opacity = "1";
}
