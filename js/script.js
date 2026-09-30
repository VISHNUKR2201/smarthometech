document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const menuOverlay = document.getElementById('menu-overlay');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';

            // Toggle icon
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }

        // Close menu when clicking any nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    if (menuOverlay) menuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                    const icon = hamburger.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Sticky Header Handler (All Views & Mobile)
    const header = document.getElementById('header');
    if (header) {
        const handleHeaderScroll = () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleHeaderScroll, { passive: true });
        handleHeaderScroll(); // Initialize on page load
    }

    // 404 Click & Form Submit Position Tracker (Auto-memorize exact section & scroll position)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href*="404.html"], button[onclick*="404.html"], button[type="submit"], input[type="submit"]');
        if (link) {
            const form = link.closest('form[action*="404.html"]');
            if (link.getAttribute('href')?.includes('404.html') || link.getAttribute('onclick')?.includes('404.html') || form) {
                const pageName = window.location.pathname.split('/').pop() || 'index.html';
                sessionStorage.setItem('404_return_page', pageName);
                sessionStorage.setItem('404_return_scroll_y', window.scrollY.toString());

                const parentSection = link.closest('section[id], footer[id], div[id]');
                if (parentSection && parentSection.id) {
                    sessionStorage.setItem('404_return_section', parentSection.id);
                }
            }
        }
    });

    document.addEventListener('submit', (e) => {
        const form = e.target.closest('form[action*="404.html"]');
        if (form) {
            const pageName = window.location.pathname.split('/').pop() || 'index.html';
            sessionStorage.setItem('404_return_page', pageName);
            sessionStorage.setItem('404_return_scroll_y', window.scrollY.toString());

            const parentSection = form.closest('section[id], footer[id], div[id]');
            if (parentSection && parentSection.id) {
                sessionStorage.setItem('404_return_section', parentSection.id);
            }
        }
    });

    // Instant Direct Jump for Hash Targets or Exact Stored Position (e.g. returning from 404)
    const returnScrollY = sessionStorage.getItem('404_return_scroll_y');
    if (returnScrollY !== null) {
        const targetY = parseInt(returnScrollY, 10);
        if (!isNaN(targetY)) {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
            const doScroll = () => {
                window.scrollTo({
                    top: targetY,
                    behavior: 'instant'
                });
            };
            doScroll();
            requestAnimationFrame(doScroll);
            setTimeout(doScroll, 50);
            sessionStorage.removeItem('404_return_scroll_y');
        }
    } else if (window.location.hash) {
        const hashTarget = document.querySelector(window.location.hash);
        if (hashTarget) {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
            const jumpInstant = () => {
                const offsetTop = hashTarget.getBoundingClientRect().top + window.pageYOffset - 85;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'instant'
                });
            };
            jumpInstant();
            requestAnimationFrame(jumpInstant);
            setTimeout(jumpInstant, 50);
        }
    }

    // Smooth Scroll for in-page anchor clicks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                    const icon = hamburger.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Stats Counter Animation
    const statsSection = document.getElementById('stats');
    const counters = document.querySelectorAll('.stat-item h3');
    let started = false;

    function startCount(el) {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText.replace('+', '').replace('K', '');

        const speed = 200;
        const inc = target / speed;

        if (count < target) {
            let newVal = Math.ceil(count + inc);
            if (target >= 1000) {
                el.innerText = Math.floor(newVal / 1000) + 'K+'; // Format as K+ during count if large
                // Actually, keep it simple for now, format at end
                el.innerText = newVal;
            } else {
                el.innerText = newVal;
            }
            setTimeout(() => startCount(el), 20);
        } else {
            if (target >= 1000) {
                el.innerText = Math.floor(target / 1000) + 'K+';
            } else {
                el.innerText = target + '+';
            }
        }
    }

    if (statsSection) {
        // Check on load in case visible
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.1;
        if (sectionPos < screenPos && !started) {
            counters.forEach(counter => startCount(counter));
            started = true;
        }

        window.addEventListener('scroll', () => {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.1;

            if (sectionPos < screenPos && !started) {
                counters.forEach(counter => startCount(counter));
                started = true;
            }
        });
    }

    // Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    const controls = document.querySelectorAll('.control-line');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    let slideTimer;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        controls.forEach(ctrl => ctrl.classList.remove('active'));

        // Wrap around
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
        controls[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startSlider() {
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    function resetSlider() {
        clearInterval(slideTimer);
        startSlider();
    }

    if (slides.length > 0) {
        // Initialize
        startSlider();

        // Manual Controls
        controls.forEach(ctrl => {
            ctrl.addEventListener('click', () => {
                const index = parseInt(ctrl.getAttribute('data-index'));
                showSlide(index);
                resetSlider();
            });
        });
    }

    // Projects Slider Logic (Automatic with Pagination)
    const projectsSlider = {
        track: document.getElementById('projectsTrack'),
        cards: document.querySelectorAll('.project-card-new'),
        pagination: document.querySelectorAll('.project-pagination .page-line'),
        currentIndex: 0,
        autoplayInterval: null,
        autoplayDelay: 4000,
        touchStartX: 0,
        touchEndX: 0,

        init() {
            if (!this.track || this.cards.length === 0) {
                console.log('Projects slider: track or cards not found');
                return;
            }

            console.log('Projects slider initializing...', {
                track: this.track,
                cardsCount: this.cards.length,
                paginationCount: this.pagination.length
            });

            // Set up pagination click handlers
            this.pagination.forEach((line, index) => {
                line.addEventListener('click', () => {
                    console.log('Pagination clicked:', index);
                    this.goToSlide(index);
                    this.resetAutoplay();
                });
            });

            // Start autoplay
            this.startAutoplay();
            console.log('Autoplay started');

            // Pause on hover (desktop)
            this.track.addEventListener('mouseenter', () => this.stopAutoplay());
            this.track.addEventListener('mouseleave', () => this.startAutoplay());

            // Touch events for mobile
            this.track.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
                this.stopAutoplay();
            }, { passive: true });

            this.track.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
                this.startAutoplay();
            }, { passive: true });

            // Update pagination on scroll
            this.track.addEventListener('scroll', () => {
                this.updatePaginationOnScroll();
            });
        },

        handleSwipe() {
            const swipeThreshold = 50;
            const diff = this.touchStartX - this.touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    this.nextSlide();
                } else {
                    // Swipe right - previous slide
                    this.prevSlide();
                }
            }
        },

        updatePaginationOnScroll() {
            const cardWidth = this.cards[0].offsetWidth;
            const gap = 30;
            const scrollLeft = this.track.scrollLeft;
            const index = Math.round(scrollLeft / (cardWidth + gap));

            if (index !== this.currentIndex && index < this.pagination.length) {
                this.currentIndex = index;
                this.pagination.forEach((line, i) => {
                    line.classList.toggle('active', i === index);
                });
            }
        },

        goToSlide(index) {
            this.currentIndex = index;
            const cardWidth = this.cards[0].offsetWidth;
            const gap = 30;
            const scrollAmount = (cardWidth + gap) * index;

            this.track.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });

            // Update pagination
            this.pagination.forEach((line, i) => {
                line.classList.toggle('active', i === index);
            });
        },

        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.pagination.length;
            this.goToSlide(this.currentIndex);
        },

        prevSlide() {
            this.currentIndex = (this.currentIndex - 1 + this.pagination.length) % this.pagination.length;
            this.goToSlide(this.currentIndex);
        },

        startAutoplay() {
            this.stopAutoplay();
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoplayDelay);
        },

        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        },

        resetAutoplay() {
            this.stopAutoplay();
            this.startAutoplay();
        }
    };

    // Initialize projects slider
    projectsSlider.init();

    // Fallback initialization for mobile - ensure it starts after a short delay
    setTimeout(() => {
        if (projectsSlider.autoplayInterval === null) {
            console.log('Reinitializing projects slider...');
            projectsSlider.init();
        }
    }, 1000);

    // Keep the old function for button clicks
    window.scrollProjects = function (direction) {
        const currentIndex = projectsSlider.currentIndex;
        const newIndex = (currentIndex + direction + projectsSlider.pagination.length) % projectsSlider.pagination.length;
        projectsSlider.goToSlide(newIndex);
        projectsSlider.resetAutoplay();
    };

    // Testimonials Swiper
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
        },
    });

});
