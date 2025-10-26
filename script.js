// Navigation Toggle for Mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Compute dynamic offset for fixed navbar + promo banner
function getFixedOffset() {
    const navbarEl = document.querySelector('.navbar');
    const bannerEl = document.getElementById('promo-banner');
    const navHeight = navbarEl ? navbarEl.offsetHeight : 0;
    let bannerHeight = 0;
    if (bannerEl) {
        const bannerStyle = getComputedStyle(bannerEl);
        if (bannerStyle.position === 'fixed') {
            bannerHeight = bannerEl.offsetHeight;
        }
    }
    return navHeight + bannerHeight;
}

// Smooth scrolling for navigation links with dynamic offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = getFixedOffset();
            const elementPosition = target.offsetTop;
            const offsetPosition = Math.max(elementPosition - offset, 0);

            const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({
                top: offsetPosition,
                behavior: prefersReduced ? 'auto' : 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

window.addEventListener('scroll', () => {
    let current = '';
    const offset = getFixedOffset() + 20; // small cushion

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - offset) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling (basic)
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic form validation
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;

        if (name && email && message) {
            // In a real application, you would send this to a server
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Add loading animation for images (if needed in future)
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

// Observe any images that might be added later
document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// Scroll-triggered animations with improved performance
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for better visual flow
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 50);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animation classes to elements with better performance
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .menu-category, .feature-item, .detail-item, .gallery-item');

    animatedElements.forEach((el) => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.menu-category, .feature, .info-card, .gallery-item');
    cards.forEach(card => {
        card.classList.add('hover-lift');
    });

    // Optimize hero animations and add subtle parallax
    const hero = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero-title');
    const heroDetails = document.querySelector('.hero-details');

    // Start hero animations immediately
    if (heroTitle) {
        heroTitle.style.animationPlayState = 'running';
    }
    if (heroDetails) {
        heroDetails.style.animationPlayState = 'running';
    }

    // Subtle parallax effect for hero background (disabled for reduced motion)
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (hero && !reduceMotion) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * -0.3;
                    hero.style.transform = `translateY(${rate}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Set loading/decoding hints for images
    const navLogoImg = document.querySelector('.nav-logo img');
    document.querySelectorAll('img').forEach(img => {
        if (img === navLogoImg) {
            img.loading = 'eager';
            img.decoding = 'async';
            return;
        }
        if (img.id === 'hero-fallback') {
            img.decoding = 'async';
            return;
        }
        img.loading = 'lazy';
        img.decoding = 'async';
    });

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });

    // Ensure gallery marquee images always render (fallback if any fail)
    const placeholderSrc = 'images/placeholder.jpg';
    const galleryImgs = document.querySelectorAll('.gallery .gallery-item img');
    galleryImgs.forEach(img => {
        // Hint performance
        img.loading = img.loading || 'lazy';
        img.decoding = img.decoding || 'async';

        // If an image fails, swap to placeholder
        img.addEventListener('error', () => {
            if (img.src.indexOf(placeholderSrc) === -1) {
                img.src = placeholderSrc;
            }
        }, { once: true });

        // Proactively test the source to trigger error early
        const probe = new Image();
        probe.onload = () => {};
        probe.onerror = () => {
            if (img.src.indexOf(placeholderSrc) === -1) {
                img.src = placeholderSrc;
            }
        };
        probe.src = img.currentSrc || img.src;
    });

    // Modal functionality
    const orderBtn = document.getElementById('order-btn');
    const mobileOrderBtn = document.getElementById('mobile-order-btn');
    const orderModal = document.getElementById('order-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');

    // Function to show modal
    function showModal() {
        orderModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to hide modal
    function hideModal() {
        orderModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event listeners for modal
    if (orderBtn) {
        orderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal();
        });
    }

    if (mobileOrderBtn) {
        mobileOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal();
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', hideModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', hideModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && orderModal.classList.contains('show')) {
            hideModal();
        }
    });

    // Video fallback handling
    const heroVideo = document.getElementById('hero-video');
    const heroFallback = document.getElementById('hero-fallback');

    if (heroVideo && heroFallback) {
        // Set a timeout to check if video loads
        setTimeout(() => {
            // If video is still visible after 3 seconds, assume it loaded successfully
            if (heroVideo.style.display !== 'none') {
                // Video appears to be working, keep fallback hidden
                heroFallback.style.display = 'none';
            }
        }, 3000);

        // Listen for iframe load events
        heroVideo.addEventListener('load', () => {
            // Video loaded successfully, ensure fallback is hidden
            heroFallback.style.display = 'none';
        });

        // If there's an error with the iframe, show fallback
        heroVideo.addEventListener('error', () => {
            heroVideo.style.display = 'none';
            heroFallback.style.display = 'block';
        });
    }

    console.log('Riverside Cafe website loaded successfully!');
});
