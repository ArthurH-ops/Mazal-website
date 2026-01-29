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
    const data = {
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        privacy: formData.get('privacy')
    };

    // Basic validation
    if (!data.firstname || !data.lastname || !data.email || !data.message || !data.privacy) {
        alert(currentLang === 'de'
            ? 'Bitte füllen Sie alle Pflichtfelder aus und stimmen Sie der Datenschutzerklärung zu.'
            : 'Please fill in all required fields and agree to the privacy policy.'
        );
        return;
    }

    // Show success message (in a real implementation, you would send the data to a server)
    const submitBtn = e.target.querySelector('.form-submit');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = currentLang === 'de' ? 'Wird gesendet...' : 'Sending...';

    // Simulate form submission
    setTimeout(() => {
        alert(currentLang === 'de'
            ? 'Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.'
            : 'Thank you for your message! We will get back to you soon.'
        );

        // Reset form
        e.target.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 1500);
}

