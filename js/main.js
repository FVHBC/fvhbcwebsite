// ═══════ MOBILE NAV ═══════
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('mobileOverlay');

function toggleNav() {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleNav);
overlay.addEventListener('click', toggleNav);

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) toggleNav();
    });
});

// ═══════ NAV SCROLL EFFECT ═══════
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ═══════ SCROLL REVEAL ═══════
const revealElements = document.querySelectorAll('.reveal, .reveal-slide-left, .reveal-clip');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ═══════ HERO PARALLAX ═══════
const heroBg = document.querySelector('.hero-bg');
if (heroBg && window.matchMedia('(min-width: 900px)').matches) {
    const hero = document.querySelector('.hero');
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            if (scrollY <= hero.offsetHeight) {
                heroBg.style.transform = 'translateY(' + scrollY * 0.4 + 'px)';
            }
            ticking = false;
        });
    });
}

// ═══════ PAGE TRANSITIONS ═══════
const ptOverlay = document.createElement('div');
ptOverlay.className = 'page-transition';
document.body.appendChild(ptOverlay);

// Fade out overlay to reveal page on load
requestAnimationFrame(() => ptOverlay.classList.add('fade-out'));

document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href ||
        href.startsWith('#') ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        link.target === '_blank') return;

    e.preventDefault();
    ptOverlay.classList.remove('fade-out');
    ptOverlay.classList.add('fade-in');
    ptOverlay.addEventListener('animationend', () => {
        window.location.href = href;
    }, { once: true });
});

// ═══════ FORM HANDLER ═══════
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.style.background = 'var(--sage)';
    btn.style.color = 'white';
    e.target.reset();
    setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
    }, 3000);
}
