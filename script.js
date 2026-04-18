document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinkItems = document.querySelectorAll('.mobile-nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle Mobile Menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close menu when a link is clicked
    mobileLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // 2. Parallax Effect for Hero
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        heroBg.style.transform = `scale(1.05) translateY(${scrollValue * 0.3}px)`;
    });

    // 3. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal, .reveal-card');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // stop observing once it's revealed
                observer.unobserve(entry.target);
            }
        });
    };

    const options = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(revealCallback, options);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // 4. Smooth Anchor Scrolling (Fallback for old browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Card Hover Micro-interactions (Optional/Additional)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Subtle sound effect or other feedback could go here
        });
    });
});
