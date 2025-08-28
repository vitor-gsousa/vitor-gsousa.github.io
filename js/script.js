// Theme Toggle
const themeToggle = document.querySelectorAll('.theme-toggle');
const themeIcon = document.querySelectorAll('.theme-toggle i');

themeToggle.forEach((toggle, index) => {
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeIcon.forEach(icon => {
            icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        });
    });
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeIcon.forEach(icon => {
    icon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

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
const text = 'Olá! Sou o Vítor, Especialista em Suporte TI';
let index = 0;

function typeText() {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
    }
}

setTimeout(typeText, 1000);

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

// Form Reset on Reload
window.addEventListener('beforeunload', () => {
    document.querySelectorAll('form').forEach(form => form.reset());
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
