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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 100) {
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

// Scroll-triggered animations
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
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animation classes to elements
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .menu-category, .feature, .info-card, .gallery-item');
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in-up');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.menu-category, .feature, .info-card, .gallery-item');
    cards.forEach(card => {
        card.classList.add('hover-lift');
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });

    console.log('Riverside Cafe website loaded successfully!');

    // Initialize gallery pagination after a short delay to ensure DOM is ready
    setTimeout(() => {
        initGalleryPagination();
    }, 100);
});

// Gallery Pagination Function
function initGalleryPagination() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');

    console.log('Gallery pagination debug:', {
        galleryItems: galleryItems.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        dots: dots.length
    });

    if (galleryItems.length > 0 && prevBtn && nextBtn && dots.length > 0) {
        const itemsPerPage = 6;
        const totalPages = Math.ceil(galleryItems.length / itemsPerPage);
        let currentPage = 1;

        // Function to show items for current page
        function showPage(page) {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            galleryItems.forEach((item, index) => {
                if (index >= startIndex && index < endIndex) {
                    item.style.display = 'block';
                    // Add fade-in animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                }
            });

            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index + 1 === page);
            });

            // Update buttons
            prevBtn.disabled = page === 1;
            nextBtn.disabled = page === totalPages;

            currentPage = page;
        }

        // Initialize gallery with transition styles
        galleryItems.forEach(item => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });

        // Button event listeners
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                showPage(currentPage - 1);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                showPage(currentPage + 1);
            }
        });

        // Dot event listeners
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showPage(index + 1);
            });
        });

        // Show first page on load
        showPage(1);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentPage > 1) {
                showPage(currentPage - 1);
            } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
                showPage(currentPage + 1);
            }
        });

        console.log(`Gallery pagination initialized: ${galleryItems.length} items, ${totalPages} pages`);
    } else {
        console.error('Gallery pagination elements not found!');
    }
}
