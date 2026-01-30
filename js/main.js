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
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

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
