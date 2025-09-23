document.addEventListener("DOMContentLoaded", function () {
  // Dynamic Greeting
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }

  // Show greeting modal on page load
  const modal = document.getElementById("greetingModal");
  const modalGreeting = document.getElementById("modalGreeting");
  const modalClose = document.getElementById("modalClose");
  const greetingEl = document.getElementById("greeting");

  if (modal && modalGreeting) {
    // Set greeting text in modal
    modalGreeting.textContent = getGreeting() + " 👋";

    // Show modal
    modal.classList.add("show");

    // Auto-close after 4 seconds
    const autoCloseTimer = setTimeout(() => {
      closeModal();
    }, 4000);

    // Close modal function
    function closeModal() {
      modal.classList.remove("show");
      clearTimeout(autoCloseTimer);
    }

    // Close on button click
    if (modalClose) {
      modalClose.addEventListener("click", closeModal);
    }

    // Close on backdrop click
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
      }
    });
  }

  // Keep the original greeting in the profile card (hidden by default)
  if (greetingEl) {
    greetingEl.textContent = getGreeting() + " 👋";
    greetingEl.style.display = "none"; // Hide the original greeting
  }

  // Name color toggle
  const colorBtn = document.getElementById("colorBtn");
  const name = document.getElementById("name");
  colorBtn.addEventListener("click", function () {
    name.style.color = name.style.color === "teal" ? "#333" : "teal";
  });

  // Skills section toggle
  const toggleSkillsBtn = document.getElementById("toggleSkillsBtn");
  const skillsSection = document.querySelector(".skills-section");
  const profileCard = document.querySelector(".profile-card");
  toggleSkillsBtn.addEventListener("click", function () {
    profileCard.classList.toggle("slide-left");
    skillsSection.classList.toggle("fade-in");
  });

  // Projects section toggle
  const toggleProjectsBtn = document.getElementById("toggleProjectsBtn");
  const projectsSection = document.querySelector(".projects-section");
  if (toggleProjectsBtn && projectsSection) {
    toggleProjectsBtn.addEventListener("click", function () {
      // Scroll to projects section
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  // Navbar hamburger toggle
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });

  // Dark/Light mode toggle
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  // Persist theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
  themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      localStorage.setItem("theme", "light");
    }
  });

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;
      // Name
      const nameInput = document.getElementById("contactName");
      const nameError = document.getElementById("nameError");
      if (!nameInput.value.trim()) {
        nameError.textContent = "Name is required.";
        valid = false;
      } else {
        nameError.textContent = "";
      }
      // Email
      const emailInput = document.getElementById("contactEmail");
      const emailError = document.getElementById("emailError");
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailInput.value.trim()) {
        emailError.textContent = "Email is required.";
        valid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "Enter a valid email.";
        valid = false;
      } else {
        emailError.textContent = "";
      }
      // Message
      const messageInput = document.getElementById("contactMessage");
      const messageError = document.getElementById("messageError");
      if (!messageInput.value.trim()) {
        messageError.textContent = "Message is required.";
        valid = false;
      } else {
        messageError.textContent = "";
      }
      // Success
      const formSuccess = document.getElementById("formSuccess");
      if (valid) {
        formSuccess.textContent = "Thank you! Your message has been sent.";
        contactForm.reset();
        setTimeout(() => {
          formSuccess.textContent = "";
        }, 4000);
      } else {
        formSuccess.textContent = "";
      }
    });
  }
});
