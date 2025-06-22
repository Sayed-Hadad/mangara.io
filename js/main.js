// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize preloader
    setTimeout(function() {
        document.querySelector('.preloader').style.opacity = '0';
        document.querySelector('.preloader').style.visibility = 'hidden';
    }, 1500);

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

    // Initialize Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
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
    });
});
