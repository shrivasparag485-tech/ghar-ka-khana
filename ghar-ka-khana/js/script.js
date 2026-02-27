// ===== Sticky Header Effect =====
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("scrolled", window.scrollY > 50);
});


// ===== Typing Animation =====
const text = "Discover the Best Food & Drinks at GHAR KA KHANA";
const paragraph = document.querySelector(".hero p");

let index = 0;

function typeEffect() {
    if (index < text.length) {
        paragraph.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 50);
    }
}

paragraph.textContent = "";
setTimeout(typeEffect, 800);


// ===== Smooth Scroll Reveal Animation =====
const revealElements = document.querySelectorAll(".hero");

window.addEventListener("scroll", () => {
    revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }
    });
});


// ===== Search Box Animation =====
const searchBox = document.querySelector(".hero input");

searchBox.addEventListener("focus", () => {
    searchBox.placeholder = "Type your favorite dish...";
});

searchBox.addEventListener("blur", () => {
    searchBox.placeholder = "Search for restaurant, cuisine or a dish";
});
