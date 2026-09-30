// ========================================
// GSAP Animations for Real Estate Website
// ========================================

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // 1. HERO SECTION ANIMATIONS
    // ========================================

    // Hero content fade in and slide up
    gsap.from('.hero-content h1', {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.from('.hero-content p', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
    });

    gsap.from('.hero-content .btn', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.9
    });

    // Hero slider controls fade in
    gsap.from('.slider-controls', {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 1.2
    });

    // ========================================
    // 2. ABOUT & SERVICES SECTION
    // ========================================

    // Section intro animation
    gsap.from('.about-intro', {
        scrollTrigger: {
            trigger: '.about-intro',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });

    // Services headline
    gsap.from('.services-headline', {
        scrollTrigger: {
            trigger: '.services-headline',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out'
    });

    // Service cards stagger animation
    gsap.from('.service-card-new', {
        scrollTrigger: {
            trigger: '.services-grid-new',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.2)'
    });

    // ========================================
    // 3. PROJECTS SECTION (Discover Modern Living)
    // ========================================

    // Projects content slide from left
    gsap.from('.projects-content', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -100,
        duration: 1.2,
        ease: 'power3.out'
    });

    // Projects slider slide from right
    gsap.from('.projects-slider-container', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 100,
        duration: 1.2,
        ease: 'power3.out'
    });

    // Pagination dots stagger
    gsap.from('.page-line', {
        scrollTrigger: {
            trigger: '.projects-pagination',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(2)'
    });

    // ========================================
    // 4. PROPERTIES SECTION
    // ========================================

    // Properties header fade in
    gsap.from('.prop-header-text', {
        scrollTrigger: {
            trigger: '.properties',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });

    // Property cards stagger with scale
    gsap.from('.prop-card', {
        scrollTrigger: {
            trigger: '.properties-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 100,
        scale: 0.85,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // ========================================
    // 5. AMENITIES SECTION
    // ========================================

    // Amenity cards bounce in with stagger
    gsap.from('.amenity-card', {
        scrollTrigger: {
            trigger: '.amenities-container',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        scale: 0.7,
        rotation: -5,
        duration: 0.8,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.6)'
    });

    // ========================================
    // 6. BLOG SECTION
    // ========================================

    // Blog section header
    gsap.from('.blog h2', {
        scrollTrigger: {
            trigger: '.blog',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out'
    });

    // Blog cards slide up and fade
    gsap.from('.blog-card', {
        scrollTrigger: {
            trigger: '.blog-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 80,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // ========================================
    // 7. TESTIMONIALS SECTION
    // ========================================

    if (document.querySelector('.testimonials')) {
        gsap.from('.testimonials .section-title', {
            scrollTrigger: {
                trigger: '.testimonials',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.swiper-slide', {
            scrollTrigger: {
                trigger: '.testimonials',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.5)'
        });
    }

    // ========================================
    // 8. MODERN APARTMENT SECTION
    // ========================================

    if (document.querySelector('.modern-apartment')) {
        // Apartment content
        gsap.from('.apt-content', {
            scrollTrigger: {
                trigger: '.modern-apartment',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -80,
            duration: 1.2,
            ease: 'power3.out'
        });

        // Apartment image with parallax
        gsap.from('.apt-image', {
            scrollTrigger: {
                trigger: '.modern-apartment',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: 80,
            duration: 1.2,
            ease: 'power3.out'
        });

        // Parallax effect for apartment image
        gsap.to('.apt-image img', {
            scrollTrigger: {
                trigger: '.modern-apartment',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -50,
            ease: 'none'
        });
    }

    // ========================================
    // 9. TEAM SECTION
    // ========================================

    if (document.querySelector('.team')) {
        gsap.from('.team-member', {
            scrollTrigger: {
                trigger: '.team',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            rotation: 3,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }

    // ========================================
    // 10. FOOTER ANIMATION
    // ========================================

    gsap.from('.footer', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });

    // Footer columns stagger
    gsap.from('.footer-col', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // ========================================
    // 11. NAVBAR ANIMATION ON SCROLL (Always Visible Sticky Header)
    // ========================================

    const header = document.querySelector('.header');
    if (header) {
        gsap.set(header, { y: 0, opacity: 1 });
    }

    // ========================================
    // 12. SMOOTH SCROLL REVEAL FOR ALL IMAGES
    // ========================================

    gsap.utils.toArray('img:not(.smart-tech-card img)').forEach((img) => {
        gsap.from(img, {
            scrollTrigger: {
                trigger: img,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 1.1,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // ========================================
    // 13. HOVER ANIMATIONS FOR CARDS
    // ========================================

    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // ========================================
    // 14. PARALLAX SCROLLING EFFECTS
    // ========================================

    // Hero background parallax
    if (document.querySelector('.hero')) {
        gsap.to('.hero', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            backgroundPosition: '50% 100%',
            ease: 'none'
        });
    }

    // ========================================
    // 15. NUMBER COUNTER ANIMATION
    // ========================================

    const counters = document.querySelectorAll('.stat-number, .counter');

    counters.forEach(counter => {
        const target = parseInt(counter.innerText);

        gsap.from(counter, {
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            innerText: 0,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power1.out',
            onUpdate: function () {
                counter.innerText = Math.ceil(counter.innerText);
            }
        });
    });

    console.log('🎬 GSAP Animations Loaded Successfully!');
});
