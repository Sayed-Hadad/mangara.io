// Immediate preloader removal fallback
(function() {
    const removePreloader = () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                if (preloader && preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }
    };

    // Multiple fallbacks
    setTimeout(removePreloader, 1500);

    // Also try on window load
    if (typeof window !== 'undefined') {
        window.addEventListener('load', removePreloader);
    }
})();

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize Hero Slider
    initializeHeroSlider();

    // Initialize preloader first - independent of other libraries
    const preloader = document.querySelector('.preloader');

    // Force remove preloader after maximum 3 seconds regardless of other scripts
    const forceRemovePreloader = () => {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                if (preloader && preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }
    };

    // Set timeout to remove preloader
    setTimeout(forceRemovePreloader, 1500);

    // Initialize AOS only if available
    if (typeof AOS !== 'undefined') {
        try {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                easing: 'ease-in-out'
            });
        } catch (error) {
            console.log('AOS initialization failed:', error);
        }
    } else {
        // If AOS is not available, add a fallback
        console.log('AOS library not loaded, using fallback animations');
    }

    // Fix Font Awesome icons if needed
    if (typeof FontAwesome !== 'undefined') {
        try {
            setTimeout(function() {
                FontAwesome.dom.i2svg();
            }, 500);
        } catch (error) {
            console.log('FontAwesome initialization failed:', error);
        }
    }

    // Initialize Particles.js safely
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        try {
            particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#c8a97e"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#c8a97e",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
        } catch (error) {
            console.log('Particles.js initialization failed:', error);
        }
    } else if (document.getElementById('particles-js')) {
        console.log('Particles.js library not loaded');
    }

    // Initialize animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fadeIn').forEach(el => {
        observer.observe(el);
    });

    // Initialize Enhanced Sticky Header with Scroll Direction Detection
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    let isScrollingUp = false;

    function updateStickyHeader() {
        const scrollTop = window.scrollY;
        isScrollingUp = scrollTop < lastScrollTop;
        lastScrollTop = scrollTop;

        if (scrollTop > 100) {
            header.classList.add('sticky');
            // Add extra enhancement based on scroll direction
            if (isScrollingUp && scrollTop > 300) {
                header.style.transform = 'translateY(0)';
            } else if (!isScrollingUp && scrollTop > 300) {
                header.style.transform = 'translateY(-100%)';
            }
        } else {
            header.classList.remove('sticky');
            header.style.transform = 'translateY(0)';
        }
    }

    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateStickyHeader();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Enhanced Gallery Animation with Staggered Effects
    function revealGalleryItems() {
        const items = document.querySelectorAll('.gallery-item');
        const windowHeight = window.innerHeight;

        items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < windowHeight - 100) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150); // Staggered animation
            }
        });
    }

    // Optimized scroll listener for gallery
    let galleryTicking = false;
    window.addEventListener('scroll', function() {
        if (!galleryTicking) {
            requestAnimationFrame(function() {
                revealGalleryItems();
                galleryTicking = false;
            });
            galleryTicking = true;
        }
    });

    // Initialize gallery animation
    window.addEventListener('DOMContentLoaded', revealGalleryItems);

    // Enhanced Floating Social Media Icons Animation
    const socialIcons = document.querySelectorAll('.social-float');
    socialIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.1}s`;
        icon.classList.add('animate-slide-in');
    });

    // Add CSS animation class dynamically
    const style = document.createElement('style');
    style.textContent = `
        .animate-slide-in {
            animation: slideInRight 0.6s ease-out forwards;
            transform: translateX(100px);
            opacity: 0;
        }

        @keyframes slideInRight {
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Enhanced Hero Particles Interaction
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        // Add mouse move effect for hero section
        const hero = document.querySelector('#hero');
        hero.addEventListener('mousemove', function(e) {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;

            const heroContent = document.querySelector('.hero-content');
            heroContent.style.transform = `translate(${xPercent * 10}px, ${yPercent * 10}px)`;
        });
    }

    // Add smooth scroll behavior for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
        // Prevent body scroll when menu is open
        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Here you would typically send this data to a server
            // For demonstration, we'll just show an alert
            alert(`شكرًا ${name} على تواصلك معنا! سنتواصل معك قريبًا.`);

            // Reset the form
            contactForm.reset();
        });
    }

    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Lightbox settings for gallery
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'disableScrolling': true,
        'alwaysShowNavOnTouchDevices': true
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const hero = document.querySelector('#hero');

        if (window.innerWidth > 768) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });    // Service Cards Animation
    const serviceCards = document.querySelectorAll('.service-card');

    // Apply scroll effects to service cards with enhanced timing
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('appear');
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }, index * 100);
                servicesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    serviceCards.forEach(card => {
        // Set initial state
        card.style.transform = 'translateY(30px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        servicesObserver.observe(card);
    });
});

// Performance optimization: Reduce reflow and repaint
document.addEventListener('DOMContentLoaded', function() {
    // Optimize images loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });

    // Add will-change property to animated elements
    const animatedElements = document.querySelectorAll('.hero-content, .floating-social, .gallery-item');
    animatedElements.forEach(el => {
        el.style.willChange = 'transform';
    });
});

// Hero Slider Functionality
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.querySelector('.progress-bar');

    let currentSlide = 0;
    let isAutoPlaying = true;
    let autoPlayInterval;
    let progressInterval;
    const autoPlayDelay = 6000; // 6 seconds per slide
    const progressUpdateInterval = 10; // Update progress every 10ms

    // Initialize slider
    function init() {
        if (slides.length === 0) return;

        showSlide(0);
        startAutoPlay();

        // Add event listeners
        if (prevBtn) prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            previousSlide();
            startAutoPlay();
        });

        if (nextBtn) nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoPlay();
                goToSlide(index);
                startAutoPlay();
            });
        });

        // Pause on hover
        const heroSection = document.querySelector('#hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopAutoPlay);
            heroSection.addEventListener('mouseleave', startAutoPlay);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                stopAutoPlay();
                nextSlide();
                startAutoPlay();
            } else if (e.key === 'ArrowRight') {
                stopAutoPlay();
                previousSlide();
                startAutoPlay();
            }
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        if (heroSection) {
            heroSection.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            heroSection.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                stopAutoPlay();
                if (diff > 0) {
                    // Swiped left - next slide
                    nextSlide();
                } else {
                    // Swiped right - previous slide
                    previousSlide();
                }
                startAutoPlay();
            }
        }
    }

    function showSlide(index) {
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev', 'next');
            if (i === index) {
                slide.classList.add('active');
            } else if (i < index) {
                slide.classList.add('prev');
            } else {
                slide.classList.add('next');
            }
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Update background dynamically
        const activeSlide = slides[index];
        const bgImage = activeSlide.getAttribute('data-bg');
        if (bgImage) {
            const heroTexture = activeSlide.querySelector('.hero-texture');
            if (heroTexture) {
                heroTexture.style.backgroundImage = `
                    radial-gradient(circle at 25% 25%, rgba(139, 90, 43, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, rgba(200, 169, 126, 0.1) 0%, transparent 50%),
                    url('${bgImage}')
                `;
            }
        }

        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function previousSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    function goToSlide(index) {
        if (index !== currentSlide) {
            showSlide(index);
            resetProgress();
        }
    }

    function startAutoPlay() {
        if (!isAutoPlaying) return;

        stopAutoPlay(); // Clear any existing intervals

        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        startProgressBar();
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
        stopProgressBar();
    }

    function startProgressBar() {
        if (!progressBar) return;

        let progress = 0;
        const increment = 100 / (autoPlayDelay / progressUpdateInterval);

        progressInterval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 100;
                stopProgressBar();
            }
            progressBar.style.width = progress + '%';
        }, progressUpdateInterval);
    }

    function stopProgressBar() {
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
    }

    function resetProgress() {
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        stopProgressBar();
    }

    // Initialize the slider
    init();
}
