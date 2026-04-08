/* ========================================
   Portfolio JS — Advanced
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
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
    document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        });
    });

    // --- Active nav on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    function updateActive() {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY + 120 >= s.offsetTop) current = s.id;
        });
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
    }
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();

    // --- Typewriter ---
    const tw = document.getElementById('typewriter');
    const phrases = ['clear insights.', 'smarter decisions.', 'strategic value.', 'compelling stories.'];
    let pi = 0, ci = 0, deleting = false;
    function type() {
        const phrase = phrases[pi];
        tw.textContent = phrase.substring(0, deleting ? --ci : ++ci);
        let delay = deleting ? 48 : 88;
        if (!deleting && ci === phrase.length) { delay = 2000; deleting = true; }
        else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 380; }
        setTimeout(type, delay);
    }
    setTimeout(type, 1200);

    // --- Scroll animations ---
    const animEls = document.querySelectorAll('.anim');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const parent = entry.target.parentElement;
            const siblings = parent ? [...parent.children].filter(c => c.classList.contains('anim')) : [];
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => entry.target.classList.add('visible'), Math.max(0, idx) * 90);
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -55px 0px', threshold: 0.06 });
    animEls.forEach(el => observer.observe(el));

    // --- Hero photo parallax tilt ---
    const heroCenter = document.querySelector('.hero-center');
    if (heroCenter) {
        document.addEventListener('mousemove', e => {
            const x = (e.clientX / window.innerWidth - 0.5) * 12;
            const y = (e.clientY / window.innerHeight - 0.5) * 12;
            heroCenter.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg)`;
        });
        document.addEventListener('mouseleave', () => { heroCenter.style.transform = ''; });
    }

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

    // --- Photo fallback ---
    const photo = document.getElementById('hero-photo');
    if (photo) {
        photo.addEventListener('error', () => {
            photo.style.display = 'none';
            const p = photo.parentElement;
            p.style.cssText += 'background:linear-gradient(135deg,#6366f1,#10b981);display:flex;align-items:center;justify-content:center;';
            const s = document.createElement('span');
            s.textContent = 'AB';
            s.style.cssText = 'font-size:2.2rem;font-weight:900;color:white;letter-spacing:-1px';
            p.appendChild(s);
        });
    }

    // --- Lazy image fade ---
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.complete) return;
        img.style.cssText = 'opacity:0;transition:opacity .5s ease';
        img.addEventListener('load', () => { img.style.opacity = '1'; });
    });

    console.log('✨ Portfolio loaded');
});
