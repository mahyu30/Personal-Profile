document.addEventListener("DOMContentLoaded", function() {
    alert("Welcome to Cloyd Matthew Arabe's personal profile!");

    const colorBtn = document.getElementById("colorBtn");
    const name = document.getElementById("name");
    const toggleProjectsBtn = document.getElementById("toggleSkillsBtn");
    const skillsSection = document.querySelector('.skills-section');
    const profileCard = document.querySelector('.profile-card');

    colorBtn.addEventListener("click", function() {
        // Change name color
        name.style.color = name.style.color === "teal" ? "#333" : "teal";
    });

    toggleProjectsBtn.addEventListener("click", function() {
        profileCard.classList.toggle("slide-left");
        skillsSection.classList.toggle("fade-in");
    });
});