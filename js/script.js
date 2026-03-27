/* =====================================================
   BALAJI JEWELLERY - JavaScript
   Premium Silver Jewellery Website
   © 2026 Balaji Jewellery. All Rights Reserved.
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initNavigation();
    initScrollEffects();
    initScrollAnimations();
    initContactForm();
});

/* =====================================================
   PAGE LOADER
   ===================================================== */
function initLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 500);
        });
    }
}

/* =====================================================
   NAVIGATION
   ===================================================== */
function initNavigation() {
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Header on Scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking nav links
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                if (navOverlay) {
                    navOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        });
    });

    // Set active nav link based on current page
    setActiveNavLink();
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* =====================================================
   SCROLL EFFECTS
   ===================================================== */
function initScrollEffects() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    // Show/Hide Scroll to Top Button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to Top on Click
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* =====================================================
   SCROLL ANIMATIONS
   ===================================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger-animation');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

/* =====================================================
   CONTACT FORM
   ===================================================== */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message (in a real application, you would send data to server)
            const successMessage = document.querySelector('.form-success');
            if (successMessage) {
                successMessage.classList.add('show');
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.classList.remove('show');
                }, 5000);
            }
            
            // Log form data (for demonstration)
            console.log('Form submitted:', {
                name: name,
                email: email,
                phone: phone,
                message: message
            });
        });

        // Enhanced form interactions
        const formControls = contactForm.querySelectorAll('.form-control');
        formControls.forEach(function(control) {
            control.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            control.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }
}

/* =====================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/* =====================================================
   IMAGE LAZY LOADING ENHANCEMENT
   ===================================================== */
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(function(img) {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

/* =====================================================
   WHATSAPP BUTTON TOOLTIP
   ===================================================== */
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
    whatsappBtn.setAttribute('title', 'Chat with us on WhatsApp');
}
