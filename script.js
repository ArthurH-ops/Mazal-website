// Page Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
});

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update theme toggle button icon
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        // Use outline icons - sun for light mode, moon for dark mode
        toggle.innerHTML = theme === 'dark' ? '☾' : '☀';
    });
}

// Language Toggle
let currentLang = 'de';

function toggleLanguage() {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    localStorage.setItem('language', currentLang);

    // Update all elements with language attributes
    document.querySelectorAll('[data-de][data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${currentLang}`);
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Update language toggle button
    const langToggles = document.querySelectorAll('.lang-toggle');
    langToggles.forEach(toggle => {
        toggle.textContent = currentLang === 'de' ? 'EN' : 'DE';
    });

    // Update form placeholders
    updatePlaceholders();
}

// Initialize theme and language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme (default to light)
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    // Load saved language
    const savedLang = localStorage.getItem('language') || 'de';
    if (savedLang !== 'de') {
        currentLang = 'de'; // Reset to trigger toggle
        toggleLanguage();
    }

    // Update theme button for current theme
    updateThemeButton(savedTheme);

    // Add event listeners for toggle buttons
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cookie Banner
    initCookieBanner();

    // Contact Form
    initContactForm();

    // Header scroll effect
    initHeaderScroll();

    // Scroll reveal animations
    initScrollReveal();

    // Update form placeholders
    updatePlaceholders();

    // Initialize parallax effect
    initParallaxEffect();

    // Initialize back to top button
    initBackToTop();

    // Initialize number counters
    initNumberCounters();
});

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// Scroll reveal animations
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service items
    document.querySelectorAll('.service-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Observe team members
    document.querySelectorAll('.team-member').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(el);
    });

    // Observe contact sections
    document.querySelectorAll('.contact-left, .contact-right').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Add revealed class styles
document.head.insertAdjacentHTML('beforeend', `
<style>
.revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
}
</style>
`);

// Update form placeholders for language
function updatePlaceholders() {
    document.querySelectorAll('[data-placeholder-de][data-placeholder-en]').forEach(input => {
        input.placeholder = input.getAttribute(`data-placeholder-${currentLang}`);
    });
}

// Cookie Banner Functions
function initCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieChoice');
    
    if (!cookieChoice) {
        // Show banner after 1 second delay
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 1000);
    }
    
    // Accept cookies
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieChoice', 'accepted');
        localStorage.setItem('theme', document.body.getAttribute('data-theme') || 'light');
        localStorage.setItem('language', currentLang);
        hideCookieBanner();
    });
    
    // Decline cookies
    declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieChoice', 'declined');
        // Clear any existing stored preferences
        localStorage.removeItem('theme');
        localStorage.removeItem('language');
        hideCookieBanner();
    });
}

function hideCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    cookieBanner.style.animation = 'slideDown 0.3s ease-out';
    setTimeout(() => {
        cookieBanner.style.display = 'none';
    }, 300);
}

// Contact Form Functions
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Basic validation
    if (!formData.get('firstname') || !formData.get('lastname') || !formData.get('email') || !formData.get('message') || !formData.get('privacy')) {
        alert(currentLang === 'de'
            ? 'Bitte füllen Sie alle Pflichtfelder aus und stimmen Sie der Datenschutzerklärung zu.'
            : 'Please fill in all required fields and agree to the privacy policy.'
        );
        return;
    }

    const submitBtn = e.target.querySelector('.form-submit');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = currentLang === 'de' ? 'Wird gesendet...' : 'Sending...';

    fetch(e.target.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            alert(currentLang === 'de'
                ? 'Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.'
                : 'Thank you for your message! We will get back to you soon.'
            );
            e.target.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(() => {
        alert(currentLang === 'de'
            ? 'Es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut.'
            : 'There was an error sending your message. Please try again.'
        );
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });
}

// Hero Parallax Effect
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }, { passive: true });
}

// Back to Top Button
function initBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = '↑';
    document.body.appendChild(backToTopBtn);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// Number Counter Animation
function initNumberCounters() {
    const counters = document.querySelectorAll('.counter-number');

    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'));
                animateCounter(target, targetValue);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepDuration);
}

