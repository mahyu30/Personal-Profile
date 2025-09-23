document.addEventListener("DOMContentLoaded", function () {
  // Dynamic Greeting
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }

  // Animated counter for modal stats
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  // Initialize theme
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-mode');
      updateThemeToggle(true);
    }
  }

  function updateThemeToggle(isDark) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.innerHTML = isDark ? 
        '<i class="fa-solid fa-sun"></i>' : 
        '<i class="fa-solid fa-moon"></i>';
    }
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

    // Animate stats when modal opens
    setTimeout(() => {
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, target);
      });
    }, 500);

    // Auto-close after 5 seconds
    const autoCloseTimer = setTimeout(() => {
      closeModal();
    }, 5000);

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

  // Enhanced name color toggle
  const colorBtn = document.getElementById("colorBtn");
  const name = document.getElementById("name");
  
  if (colorBtn && name) {
    let colorIndex = 0;
    const colors = [
      { 
        background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
        text: 'Fiery Red'
      },
      { 
        background: 'linear-gradient(135deg, #4834d4, #686de0)',
        text: 'Royal Purple'
      },
      { 
        background: 'linear-gradient(135deg, #00d2d3, #54a0ff)',
        text: 'Ocean Blue'
      },
      { 
        background: 'linear-gradient(135deg, #5f27cd, #00d2d3)',
        text: 'Cosmic Gradient'
      },
      { 
        background: 'linear-gradient(135deg, #ff9ff3, #f368e0)',
        text: 'Pink Sunset'
      },
      { 
        background: 'linear-gradient(135deg, #feca57, #ff9ff3)',
        text: 'Golden Pink'
      },
      { 
        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
        text: 'Original Theme'
      }
    ];

    colorBtn.addEventListener("click", function () {
      colorIndex = (colorIndex + 1) % colors.length;
      const currentColor = colors[colorIndex];
      
      // Apply the gradient background
      name.style.background = currentColor.background;
      name.style.webkitBackgroundClip = 'text';
      name.style.webkitTextFillColor = 'transparent';
      name.style.backgroundClip = 'text';
      
      // Update button text to show current color
      colorBtn.textContent = `Color: ${currentColor.text}`;
      
      // Add a fun animation
      name.style.transform = 'scale(1.1)';
      setTimeout(() => {
        name.style.transform = 'scale(1)';
      }, 200);
      
      // Show feedback
      const feedback = document.createElement('div');
      feedback.textContent = `✨ ${currentColor.text}`;
      feedback.style.cssText = `
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--bg-secondary);
        color: var(--primary-color);
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        z-index: 1000;
      `;
      
      colorBtn.style.position = 'relative';
      colorBtn.appendChild(feedback);
      
      // Animate feedback
      setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateX(-50%) translateY(-5px)';
      }, 10);
      
      // Remove feedback
      setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => {
          if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
          }
        }, 300);
      }, 1500);
    });
  }

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

  // Initialize theme
  initTheme();

  // Dark/Light mode toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const body = document.body;
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      
      updateThemeToggle(isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
      
      // Add smooth transition effect
      body.style.transition = "all 0.3s ease";
      setTimeout(() => {
        body.style.transition = "";
      }, 300);
    });
  }

  // Enhanced smooth scrolling for navigation links
  function smoothScrollToTarget(targetId) {
    const targetElement = document.querySelector(targetId);
    const navbar = document.querySelector('.navbar');
    
    if (targetElement && navbar) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight - 20; // 20px extra padding
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      // Close mobile menu if open
      const navLinks = document.getElementById('navLinks');
      if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
      
      // Smooth scroll to target
      smoothScrollToTarget(targetId);
      
      // Add active state with animation
      this.classList.add('nav-link-active');
      setTimeout(() => {
        this.classList.remove('nav-link-active');
      }, 300);
    });
  });

  // Scroll progress indicator
  function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    }
  }

  window.addEventListener('scroll', updateScrollProgress);

  // Scroll spy functionality
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], .profile-card[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 50;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.pageYOffset;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
      link.classList.remove('nav-link-current');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('nav-link-current');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  
  // Initial call to set active link on page load
  setTimeout(updateActiveNavLink, 100);

  // Scroll to top button functionality
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  function toggleScrollToTopButton() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('scroll', toggleScrollToTopButton);

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document.querySelectorAll('.project-card, .skills-subsection').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
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
