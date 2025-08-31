"use strict";

// Elementos DOM
const projectsGrid = document.querySelector("#projects-grid");
const themeButtons = document.querySelectorAll(".theme-btn");
const navbar = document.querySelector(".navbar");

// Estado do tema
let currentTheme = localStorage.getItem("theme") || "dark";

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
  initializeTheme();
  loadProjects();
  setupScrollEffects();
  setupSmoothScrolling();
});

// Configuração do tema
function initializeTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeButtons();
}

function updateThemeButtons() {
  themeButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.id === `${currentTheme}-theme`) {
      btn.classList.add("active");
    }
  });
}

// Event listeners para mudança de tema
themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.id.replace("-theme", "");
    setTheme(theme);
  });
});

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeButtons();
}

// Efeitos de scroll
function setupScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar elementos para animação
  const animatedElements = document.querySelectorAll(
    ".skill-category, .featured-project, .timeline-item, .education-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Navegação suave
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Ajuste para navbar fixa
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Carregamento de projetos do GitHub
async function loadProjects() {
  try {
    const username = "elielmayrink";
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=12&sort=updated`
    );

    if (!response.ok) {
      throw new Error("Falha ao carregar projetos");
    }

    const repos = await response.json();
    const filteredRepos = repos
      .filter((repo) => !repo.fork && repo.description) // Filtrar apenas repositórios próprios com descrição
      .slice(0, 6); // Limitar a 6 projetos

    displayProjects(filteredRepos);
  } catch (error) {
    console.error("Erro ao carregar projetos:", error);
    displayErrorProjects();
  }
}

function displayProjects(repos) {
  if (!projectsGrid) return;

  projectsGrid.innerHTML = "";

  repos.forEach((repo) => {
    const projectCard = createProjectCard(repo);
    projectsGrid.appendChild(projectCard);
  });
}

function createProjectCard(repo) {
  const card = document.createElement("a");
  card.href = repo.html_url;
  card.target = "_blank";
  card.className = "project-card";

  const language = repo.language || "HTML";
  const description = repo.description || "Projeto sem descrição disponível";

  card.innerHTML = `
    <h4>
      <img src="./assets/imagens/icons/folder.png" alt="Projeto" />
      ${repo.name}
    </h4>
    <p>${description}</p>
    <div class="project-meta">
      <div class="project-stats">
        <span>
          <img src="./assets/imagens/icons/star.png" alt="Stars" />
          ${repo.stargazers_count}
        </span>
        <span>
          <img src="./assets/imagens/icons/git-branch.png" alt="Forks" />
          ${repo.forks_count || 0}
        </span>
      </div>
      <span>
        <img src="./assets/imagens/icons/Ellipse.png" alt="Language" />
        ${language}
      </span>
    </div>
  `;

  return card;
}

function displayErrorProjects() {
  if (!projectsGrid) return;

  projectsGrid.innerHTML = `
    <div class="project-card" style="grid-column: 1 / -1; text-align: center;">
      <h4>Projetos do GitHub</h4>
      <p>Não foi possível carregar os projetos do GitHub no momento. Visite meu perfil para ver todos os projetos.</p>
      <a href="https://github.com/elielmayrink" target="_blank" class="btn btn-primary" style="margin-top: 1.6rem;">
        Ver no GitHub
      </a>
    </div>
  `;
}

// Efeito de navbar no scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Animação de contadores
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent);
    const increment = target / 50;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + "+";
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + "+";
      }
    };

    updateCounter();
  });
}

// Observador para animar contadores quando visíveis
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".hero-stats");
if (statsSection) {
  counterObserver.observe(statsSection);
}

// Adicionar classe CSS para navbar com scroll
const style = document.createElement("style");
style.textContent = `
  .navbar.scrolled {
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  [data-theme="dark"] .navbar.scrolled {
    background: rgba(15, 23, 42, 0.95) !important;
  }
`;
document.head.appendChild(style);
