// Theme Toggle
function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeIcons = document.querySelectorAll('.theme-toggle i');
    themeIcons.forEach(icon => {
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    });
    
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
        metaTheme.content = theme === 'dark' ? '#111827' : '#6366f1';
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = getSystemTheme();
    
    const themeToUse = savedTheme || systemTheme;
    
    applyTheme(themeToUse);
    
    if (!savedTheme) {
        document.documentElement.removeAttribute('data-theme');
    }
}

const themeToggle = document.querySelectorAll('.theme-toggle');
themeToggle.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const systemTheme = getSystemTheme();
        
        const activeTheme = currentTheme || systemTheme;
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

initTheme();

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Typing Effect
const typingElement = document.querySelector('.typing-text');
const text = typingElement.textContent;
typingElement.textContent = '';
let index = 0;

function typeText() {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 50);
    }
}

setTimeout(typeText, 500);

// Progress Bar
function updateProgressBar() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.progress-bar').style.width = scrollPercent + '%';
}

// Parallax Effect
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector('.parallax-bg');
    parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
}

// Scroll Animations
function checkScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Active Navigation
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Floating Particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 2;
        const startPosition = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 15;
        const delay = Math.random() * 20;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startPosition}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form submission
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#contact form');
  if (!form) return;

  const msg = document.createElement('div');
  msg.setAttribute('aria-live', 'polite');
  msg.style.marginTop = '1rem';
  form.appendChild(msg);

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    msg.textContent = '';
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const formData = new FormData(form);
    const action = form.getAttribute('action') || window.location.href;
    try {
      const res = await fetch(action, {
        method: form.method || 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (res.ok) {
        msg.style.color = 'green';
        msg.textContent = 'Mensagem enviada! Obrigado.';
        form.reset();
      } else {
        let errText = 'Ocorreu um erro ao enviar. Tenta novamente.';
        try {
          const data = await res.json();
          if (data && data.error) errText = data.error;
        } catch (_) {}
        msg.style.color = 'crimson';
        msg.textContent = errText;
      }
    } catch (err) {
      msg.style.color = 'crimson';
      msg.textContent = 'Não foi possível contactar o servidor. Verifica a ligação.';
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});

// Event Listeners
window.addEventListener('scroll', () => {
    updateProgressBar();
    updateParallax();
    checkScrollAnimations();
    updateActiveNav();
});

window.addEventListener('load', () => {
    createParticles();
    checkScrollAnimations();
});

// Initial calls
updateProgressBar();
updateActiveNav();
