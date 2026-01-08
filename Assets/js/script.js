// ===== PROFESSIONAL DEVELOPER PORTFOLIO - JAVASCRIPT =====

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// ===== TYPING EFFECT =====
const roles = [
  'Backend Engineer',
  'Java Developer',
  'Spring Boot Expert',
  'Microservices Architect',
  'API Developer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeRole() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let timeout = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentRole.length) {
    timeout = pauseTime;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    timeout = 500;
  }

  setTimeout(typeRole, timeout);
}

// Start typing effect
setTimeout(typeRole, 1000);

// ===== NAVIGATION =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const scrollTop = document.getElementById('scroll-top');
const sections = document.querySelectorAll('section[id]');

// Mobile menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
});

// Scroll header & scroll top
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }

  if (window.scrollY > 400) {
    scrollTop.classList.add('show');
  } else {
    scrollTop.classList.remove('show');
  }
});

// Active link on scroll
function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector('.nav-link[href*="' + sectionId + '"]');

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', scrollActive);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== PAGE VISIBILITY =====
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === "visible") {
    document.title = "Shubham Bhati | Backend Engineer";
  } else {
    document.title = "Come Back!";
  }
});

// ===== PROJECTS DATA =====
let allProjects = [];

// Fetch projects from JSON
async function fetchProjects() {
  try {
    const response = await fetch('./projects/projects.json');
    allProjects = await response.json();
    displayFeaturedProjects();
    displayAllProjects('all');
    setupFilterButtons();
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
}

// Display featured projects (homepage) - Only show 4 projects
function displayFeaturedProjects() {
  const container = document.getElementById('featured-container');
  if (!container) return;

  // Get only first 4 featured projects for homepage
  const featuredProjects = allProjects.filter(p => p.featured).slice(0, 4);

  let html = '';
  featuredProjects.forEach(project => {
    html += createProjectCard(project, true);
  });

  // Add "View All Projects" button
  html += `
    <div class="featured-cta">
      <a href="projects.html" class="btn btn-outline btn-view-all">
        <i class="fas fa-th-large"></i> View All Projects
      </a>
    </div>
  `;

  container.innerHTML = html;
}

// Display all projects with optional filter
function displayAllProjects(filter = 'all') {
  const container = document.getElementById('projects-container');
  if (!container) return;

  let filteredProjects = allProjects;

  if (filter !== 'all') {
    filteredProjects = allProjects.filter(p => p.category === filter);
  }

  let html = '';
  filteredProjects.forEach(project => {
    html += createProjectCard(project, false);
  });

  container.innerHTML = html;

  // Add animation
  const cards = container.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Create project card HTML
function createProjectCard(project, isFeatured) {
  // Use local project images
  const imageUrl = `./Assets/images/projects/${project.image}`;

  return `
    <article class="project-card" data-category="${project.category}">
      <div class="project-image-wrapper">
        <img src="${imageUrl}" alt="${project.name}" class="project-image" loading="lazy">
        <div class="project-overlay">
          <a href="${project.links.view}" target="_blank" rel="noopener noreferrer" class="project-icon" title="View Project">
            <i class="fas fa-external-link-alt"></i>
          </a>
          <a href="${project.links.code}" target="_blank" rel="noopener noreferrer" class="project-icon" title="View Code">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>
      <div class="project-content">
        <span class="project-category">${project.category}</span>
        <h3 class="project-title">${project.name}</h3>
        <p class="project-description">${project.desc}</p>
        <div class="project-tech">
          ${project.stacks.split(',').map(tech => `<span>${tech.trim()}</span>`).join('')}
        </div>
      </div>
    </article>
  `;
}

// Setup filter buttons
function setupFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      // Filter projects
      const filter = btn.dataset.filter;
      displayAllProjects(filter);
    });
  });
}

// Initialize projects
fetchProjects();

// ===== CONTACT FORM (Using FormSubmit.co - no JS needed) =====
// FormSubmit handles everything server-side
// Form submissions go directly to: https://formsubmit.co/shubhambhati226@gmail.com

// ===== CONSOLE MESSAGE =====
console.log('%c Shubham Bhati', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%c Backend Engineer | Java | Spring Boot', 'color: #8b949e; font-size: 14px;');
console.log('%c Contact: shubhambhati226@gmail.com', 'color: #667eea; font-size: 12px;');
