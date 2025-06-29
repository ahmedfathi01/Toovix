// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Debug: Check if elements exist
    console.log('Nav elements found:', {
        navbar: !!navbar,
        navToggle: !!navToggle,
        navMenu: !!navMenu,
        navLinksCount: navLinks.length
    });

    // Force mobile navigation to work
    if (window.innerWidth <= 768) {
        console.log('Mobile view detected');
        if (navToggle) {
            navToggle.style.display = 'flex';
            console.log('Nav toggle forced to display');
        }
    }

    // Modern navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle - Simplified
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Simple toggle
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            console.log('Toggle clicked! Menu active:', navMenu.classList.contains('active'));

            // Force styles if needed
            if (navMenu.classList.contains('active')) {
                navMenu.style.right = '0';
            } else {
                navMenu.style.right = '-100%';
            }
        });

        console.log('Mobile navigation initialized successfully');
    } else {
        console.error('Nav toggle or menu not found!', { navToggle, navMenu });
    }

    // Dropdown functionality for mobile and desktop
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const navDropdown = document.querySelector('.nav-dropdown');

    if (dropdownToggle && navDropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            // Always prevent default on mobile, allow navigation on desktop
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                navDropdown.classList.toggle('active');
                console.log('Mobile dropdown toggled, active:', navDropdown.classList.contains('active'));
            } else {
                // On desktop, check if dropdown is being hovered
                // If not hovering, allow normal navigation to services.html
                if (!navDropdown.matches(':hover')) {
                    // Allow normal navigation
                    return true;
                }
            }
        });

        // Close dropdown when clicking on dropdown links in mobile
        const dropdownLinks = document.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navDropdown.classList.remove('active');
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Only prevent default for internal links (starting with #)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }

                // Update active link for internal navigation
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }

            // Close mobile menu if open (for both internal and external links)
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');

                // Also close dropdown if open
                const navDropdown = document.querySelector('.nav-dropdown');
                if (navDropdown) {
                    navDropdown.classList.remove('active');
                }
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// Initialize counter animations when stats section is visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats section
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');

    if (hero && heroBackground) {
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .service-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('[data-aos]');

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add custom cursor effect (optional)
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add cursor styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(37, 99, 235, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        }

        .custom-cursor.hover {
            transform: scale(1.5);
            background: rgba(37, 99, 235, 0.5);
        }
    `;
    document.head.appendChild(style);

    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations here
}, 16)); // ~60fps

// Testimonials Slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
        prevBtn.addEventListener('click', prevTestimonial);

        // Auto-slide testimonials
        setInterval(nextTestimonial, 5000);
    }
});

// Additional mobile navigation features
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');

                // Also close dropdown
                const navDropdown = document.querySelector('.nav-dropdown');
                if (navDropdown) {
                    navDropdown.classList.remove('active');
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');

                // Also close dropdown
                const navDropdown = document.querySelector('.nav-dropdown');
                if (navDropdown) {
                    navDropdown.classList.remove('active');
                }
            }
        });
    }
});

// Add smooth page transitions
function addPageTransitions() {
    // Add fade-in effect for page load
    document.body.style.transition = 'opacity 0.3s ease';

    // Add loading effect for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href$=".html"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                document.body.style.opacity = '0.7';

                setTimeout(() => {
                    window.location.href = this.href;
                }, 150);
            }
        });
    });
}

// Initialize page transitions
document.addEventListener('DOMContentLoaded', addPageTransitions);

// Enhanced scroll animations
function enhancedScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .service-card, .testimonial-card');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.feature-card, .service-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
});

window.addEventListener('scroll', throttle(enhancedScrollAnimations, 16));

// Contact form handling (if needed)
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
        });
    }
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();

    // Add loading state
    document.body.classList.add('loading');

    window.addEventListener('load', function() {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    });
});

// Add loading styles
const loadingStyles = `
.loading {
    overflow: hidden;
}

.loading * {
    animation-play-state: paused !important;
}

.loaded .hero-content {
    animation: slideInUp 1s ease 0.5s both;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

const loadingStyleSheet = document.createElement('style');
loadingStyleSheet.textContent = loadingStyles;
document.head.appendChild(loadingStyleSheet);
