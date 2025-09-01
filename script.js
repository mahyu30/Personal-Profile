document.addEventListener("DOMContentLoaded", function() {
    alert("Welcome to Cloyd Matthew Arabe's personal profile!");

    const colorBtn = document.getElementById("colorBtn");
    const bio = document.getElementById("bio");

    colorBtn.addEventListener("click", function() {
        // Change bio color
        bio.style.color = bio.style.color === "teal" ? "#333" : "teal";
    });
});
