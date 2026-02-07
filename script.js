// Mobile Menu Toggle
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('mobile-active');
}

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    const progressBar = document.getElementById('scrollProgressBar');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }

    // Parallax Effect for Hero
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        parallaxBg.style.transform = `translateX(${scrollTop * 0.5}px)`;
    }
});

// Scroll Reveal Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.reveal-child');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('active');
                }, index * 100);
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 30);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const target = parseInt(element.getAttribute('data-target'));
            animateCounter(element, target);
            counterObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number, .case-stat .stat-number').forEach(el => {
    counterObserver.observe(el);
});

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

// Navbar Hide/Show on Scroll
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        if (navbar) navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        if (navbar) navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
});

// Floating Cards Animation
gsap.registerPlugin(ScrollTrigger);

gsap.to('.card1', {
    y: -20,
    duration: 2,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1
});

gsap.to('.card2', {
    y: -15,
    duration: 2.5,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1,
    delay: 0.5
});

gsap.to('.card3', {
    y: -25,
    duration: 3,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1,
    delay: 1
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    if (testimonials.length > 0) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }
}

function nextTestimonial() {
    if (testimonials.length > 0) {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
}

// Auto-rotate testimonials
if (testimonials.length > 0) {
    setInterval(nextTestimonial, 5000);
    showTestimonial(0);
}

// Portfolio Filter
function filterPortfolio(category) {
    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Service Card Hover Effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
});

// Button Ripple Effect
document.querySelectorAll('.btn-primary, .btn-premium').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Lazy Loading Images (if any)
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--error)';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--success)';
        }
    });

    return isValid;
}

// Contact Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateForm(this)) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;

                    // Reset border colors
                    this.querySelectorAll('input, textarea, select').forEach(input => {
                        input.style.borderColor = 'var(--border)';
                    });
                }, 2000);
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
});

// A/B Testing for Headlines
const headlines = [
    "We Build Digital <span class='gradient-text'>Clout</span> for Brands",
    "The Growth Engine for <span class='gradient-text'>Indian Businesses</span>",
    "Transforming Brands into <span class='gradient-text'>Digital Powerhouses</span>"
];

window.onload = () => {
    const headEl = document.getElementById('ab-headline');
    if (headEl) {
        const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];
        headEl.innerHTML = randomHeadline;
    }
};
