let progress = 0;
const progressBar = document.getElementById("progress");
const statusText = document.getElementById("statusText");
const ratingSection = document.getElementById("ratingSection");

const stages = [
    "Preparing your food...",
    "Food is being packed...",
    "Out for delivery 🚚",
    "Delivered Successfully 🎉"
];

let stageIndex = 0;

const interval = setInterval(() => {

    progress += 25;
    progressBar.style.width = progress + "%";
    statusText.textContent = stages[stageIndex];

    stageIndex++;

    if (progress >= 100) {
        clearInterval(interval);
        localStorage.removeItem("cart");

        // Show rating section
        ratingSection.style.display = "block";
    }

}, 2000);


// ⭐ Rating Function
function rate(stars) {

    let ratings = JSON.parse(localStorage.getItem("ratings")) || [];

    ratings.push({
        stars: stars,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("ratings", JSON.stringify(ratings));

    document.getElementById("ratingMessage").textContent =
        "Thank you for rating us " + stars + " ⭐!";
}