/* ========================================
   Portfolio JS — Clean & Minimal
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar scroll ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });

    // --- Mobile menu ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(s => { s.style.transform = 'none'; s.style.opacity = '1'; });
        });
    });

    // --- Active nav on scroll ---
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // --- Scroll animations (Intersection Observer) ---
    const animTargets = [
        ...document.querySelectorAll('.section-header'),
        ...document.querySelectorAll('.about-text'),
        ...document.querySelectorAll('.about-skills'),
        ...document.querySelectorAll('.timeline-item'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.edu-card'),
        ...document.querySelectorAll('.cert-card'),
        ...document.querySelectorAll('.contact-card'),
    ];

    animTargets.forEach(el => el.classList.add('animate-on-scroll'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                if (parent) {
                    const siblings = Array.from(parent.children).filter(c => c.classList.contains('animate-on-scroll'));
                    const i = siblings.indexOf(entry.target);
                    setTimeout(() => entry.target.classList.add('visible'), Math.max(0, i) * 80);
                } else {
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });

    animTargets.forEach(el => observer.observe(el));

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

    // --- Image error fallback ---
    const heroPhoto = document.getElementById('hero-photo');
    if (heroPhoto) {
        heroPhoto.addEventListener('error', () => {
            heroPhoto.style.display = 'none';
            const parent = heroPhoto.parentElement;
            parent.style.background = 'linear-gradient(135deg, #6366f1, #10b981)';
            parent.style.display = 'flex';
            parent.style.alignItems = 'center';
            parent.style.justifyContent = 'center';
            const initials = document.createElement('span');
            initials.textContent = 'AB';
            initials.style.cssText = 'font-size:1.4rem;font-weight:800;color:white;';
            parent.appendChild(initials);
        });
    }

    // --- Lazy images fade-in ---
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.complete) return;
        img.style.opacity = '0';
        img.style.transition = 'opacity .5s ease';
        img.addEventListener('load', () => { img.style.opacity = '1'; });
    });

    console.log('✨ Portfolio loaded');
});
