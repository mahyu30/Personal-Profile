document.addEventListener("DOMContentLoaded", function() {
    alert("Welcome to Cloyd Matthew Arabe's personal profile!");

    const colorBtn = document.getElementById("colorBtn");
    const bio = document.getElementById("bio");
    const toggleProjectsBtn = document.getElementById("toggleProjectsBtn");
    const projectsSection = document.querySelector('.projects-section');
    const profileCard = document.querySelector('.profile-card');

    colorBtn.addEventListener("click", function() {
        // Change bio color
        bio.style.color = bio.style.color === "teal" ? "#333" : "teal";
    });

    toggleProjectsBtn.addEventListener("click", function() {
        profileCard.classList.toggle("slide-left");
        projectsSection.classList.toggle("fade-in");
    });
});
