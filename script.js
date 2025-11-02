// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Theme Toggle (Dark/Light Mode)
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Sticky Navigation
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.project-card, .skill-item, .about-content, .contact-content').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Animate Skill Progress Bars
const skillObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            
            progressBar.style.width = `${progress}%`;
            progressBar.classList.add('animated');
        }
    });
}, skillObserverOptions);

document.querySelectorAll('.skill-progress').forEach(bar => {
    skillObserver.observe(bar);
});

// Form Validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const formMessage = document.getElementById('form-message');

// Validation Functions
function validateName(name) {
    if (!name.trim()) {
        return 'Name is required';
    }
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters';
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
        return 'Name can only contain letters and spaces';
    }
    return '';
}

function validateEmail(email) {
    if (!email.trim()) {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validateMessage(message) {
    if (!message.trim()) {
        return 'Message is required';
    }
    if (message.trim().length < 10) {
        return 'Message must be at least 10 characters';
    }
    return '';
}

// Real-time Validation
nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    if (error) {
        nameInput.classList.add('error');
        nameError.textContent = error;
    } else {
        nameInput.classList.remove('error');
        nameError.textContent = '';
    }
});

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    if (error) {
        emailInput.classList.add('error');
        emailError.textContent = error;
    } else {
        emailInput.classList.remove('error');
        emailError.textContent = '';
    }
});

messageInput.addEventListener('blur', () => {
    const error = validateMessage(messageInput.value);
    if (error) {
        messageInput.classList.add('error');
        messageError.textContent = error;
    } else {
        messageInput.classList.remove('error');
        messageError.textContent = '';
    }
});

// Clear errors on input
nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) {
        const error = validateName(nameInput.value);
        if (!error) {
            nameInput.classList.remove('error');
            nameError.textContent = '';
        }
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        const error = validateEmail(emailInput.value);
        if (!error) {
            emailInput.classList.remove('error');
            emailError.textContent = '';
        }
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('error')) {
        const error = validateMessage(messageInput.value);
        if (!error) {
            messageInput.classList.remove('error');
            messageError.textContent = '';
        }
    }
});

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous messages
    formMessage.classList.remove('success', 'error');
    formMessage.textContent = '';
    
    // Validate all fields
    const nameValidation = validateName(nameInput.value);
    const emailValidation = validateEmail(emailInput.value);
    const messageValidation = validateMessage(messageInput.value);
    
    let isValid = true;
    
    if (nameValidation) {
        nameInput.classList.add('error');
        nameError.textContent = nameValidation;
        isValid = false;
    } else {
        nameInput.classList.remove('error');
        nameError.textContent = '';
    }
    
    if (emailValidation) {
        emailInput.classList.add('error');
        emailError.textContent = emailValidation;
        isValid = false;
    } else {
        emailInput.classList.remove('error');
        emailError.textContent = '';
    }
    
    if (messageValidation) {
        messageInput.classList.add('error');
        messageError.textContent = messageValidation;
        isValid = false;
    } else {
        messageInput.classList.remove('error');
        messageError.textContent = '';
    }
    
    if (isValid) {
        // Simulate form submission (replace with actual form submission logic)
        formMessage.classList.add('success');
        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
        
        // Reset form
        contactForm.reset();
        
        // Clear form message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('success');
            formMessage.textContent = '';
        }, 5000);
    } else {
        formMessage.classList.add('error');
        formMessage.textContent = 'Please fix the errors above and try again.';
    }
});

// Parallax Effect for Home Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const home = document.querySelector('.home');
    if (home) {
        home.style.transform = `translateY(${scrolled * 0.5}px)`;
        home.style.opacity = 1 - scrolled / 500;
    }
});

// Skill Icons Hover Effect
document.querySelectorAll('.skill-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project Cards Animation on Scroll
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    projectObserver.observe(card);
});

// Smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// Initialize on page load
window.addEventListener('load', () => {
    // Set initial active nav link
    setActiveNavLink();
    
    // Trigger scroll animations
    window.scrollTo(0, 0);
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

