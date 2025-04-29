// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navRight = document.querySelector(".nav-right");

menuToggle.addEventListener("click", () => {
  navRight.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navRight.contains(e.target) && !menuToggle.contains(e.target)) {
    navRight.classList.remove("active");
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu after clicking a link
      navRight.classList.remove("active");
    }
  });
});

// Add active class to navigation links on scroll
window.addEventListener("scroll", () => {
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll("nav ul li a");

  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("nav ul li a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
});

// Animate elements when they come into view
const animateOnScroll = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target); // Stop observing once animated
    }
  });
};

const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Observe specialty cards
document.querySelectorAll(".specialty-card").forEach((card) => {
  observer.observe(card);
});

// Add hover effect to specialty cards
document.querySelectorAll(".specialty-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});
