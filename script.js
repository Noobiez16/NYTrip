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

    /**
     * Carousel Controller
     * Handles image switching and dot updates for all destination cards
     */
    class CarouselController {
        constructor() {
            this.init();
        }

        init() {
            // Event Delegation for dots and arrows
            document.addEventListener('click', (e) => {
                const dot = e.target.closest('.dot');
                const arrow = e.target.closest('.carousel-arrow');

                if (dot) {
                    const index = parseInt(dot.dataset.index);
                    this.scrollToImage(dot.closest('.card'), index);
                }

                if (arrow) {
                    const card = arrow.closest('.card');
                    const direction = arrow.classList.contains('next') ? 1 : -1;
                    this.navigate(card, direction);
                }
            });
        }

        scrollToImage(card, index) {
            const track = card.querySelector('.carousel-track');
            const dots = card.querySelectorAll('.dot');
            
            // Update Track
            track.style.transform = `translateX(-${index * 100}%)`;
            
            // Update Dots
            dots.forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });
            
            // Store current index
            card.dataset.currentIndex = index;
        }

        navigate(card, direction) {
            let currentIndex = parseInt(card.dataset.currentIndex || 0);
            const images = card.querySelectorAll('.carousel-image');
            const maxIndex = images.length - 1;

            currentIndex += direction;

            if (currentIndex < 0) currentIndex = maxIndex;
            if (currentIndex > maxIndex) currentIndex = 0;

            this.scrollToImage(card, currentIndex);
        }
    }

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

    // 5. Initialize Carousel
    new CarouselController();
});
