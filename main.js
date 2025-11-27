import "style.css";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-featured e-commerce solution with product catalog, shopping cart, and payment integration. Built with React and Node.js.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "fullstack",
    icon: "🛒",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates and team collaboration features.",
    tags: ["React", "Firebase", "Material-UI"],
    category: "react",
    icon: "✓",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "Real-time weather application with location-based forecasts and beautiful UI animations.",
    tags: ["JavaScript", "API Integration", "CSS3"],
    category: "react",
    icon: "⛅",
  },
  {
    id: 4,
    title: "Blog Platform API",
    description:
      "RESTful API for a blog platform with authentication, posts, comments, and user management.",
    tags: ["Node.js", "Express", "PostgreSQL"],
    category: "nodejs",
    icon: "📝",
  },
  {
    id: 5,
    title: "Social Media Feed",
    description:
      "Social media feed with infinite scrolling, real-time notifications, and user interactions.",
    tags: ["React", "WebSockets", "Redux"],
    category: "fullstack",
    icon: "👥",
  },
  {
    id: 6,
    title: "Data Analytics Dashboard",
    description:
      "Interactive dashboard for data visualization with charts, graphs, and real-time data processing.",
    tags: ["React", "D3.js", "Node.js"],
    category: "fullstack",
    icon: "📊",
  },
];

function initializeNavigation() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    const sections = document.querySelectorAll("section[id]");
    let currentSection = sections[0];

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section;
      }
    });

    const activeLink = document.querySelector(
      '.navbar-nav .nav-link[href="#' + currentSection.id + '"]'
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
}

function initializeSkillBars() {
  const skillFills = document.querySelectorAll(".skill-fill");
  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const percentage = entry.target.getAttribute("data-percentage");
        entry.target.style.setProperty("--skill-percentage", percentage + "%");
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillFills.forEach((fill) => observer.observe(fill));
}

function renderProjects() {
  const container = document.getElementById("projectsContainer");
  let html = "";

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    let tagsHtml = "";

    for (let j = 0; j < project.tags.length; j++) {
      tagsHtml += '<span class="project-tag">' + project.tags[j] + "</span>";
    }

    html +=
      '<div class="col-md-6 col-lg-4 mb-4 project-card" data-category="' +
      project.category +
      '">';
    html += '<div class="card h-100">';
    html += '<div class="project-image">' + project.icon + "</div>";
    html += '<div class="project-content">';
    html += "<h3>" + project.title + "</h3>";
    html += "<p>" + project.description + "</p>";
    html += '<div class="project-tags">' + tagsHtml + "</div>";
    html += "</div></div></div>";
  }

  container.innerHTML = html;
}

function initializeProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll("[data-category]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.classList.remove("hidden");
          card.style.display = "block";
          setTimeout(() => {
            card.style.animation = "none";
            setTimeout(() => {
              card.style.animation = "";
            }, 10);
          }, 10);
        } else {
          card.classList.add("hidden");
          card.style.display = "none";
        }
      });
    });
  });
}

function initializeScrollToTop() {
  const scrollTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function initialize() {
  renderProjects();
  initializeNavigation();
  initializeSkillBars();
  initializeProjectFilters();
  initializeScrollToTop();
}

document.addEventListener("DOMContentLoaded", initialize);
