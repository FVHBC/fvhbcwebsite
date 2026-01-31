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
const revealElements = document.querySelectorAll('.reveal, .reveal-slide-left, .reveal-clip, .hmong-border');
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

// ═══════ BACK TO TOP ═══════
const btt = document.createElement('button');
btt.className = 'back-to-top';
btt.setAttribute('aria-label', 'Back to top');
btt.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
document.body.appendChild(btt);

window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 400);
});

btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ═══════ DARK MODE TOGGLE ═══════
const themeBtn = document.createElement('button');
themeBtn.className = 'theme-toggle';
themeBtn.setAttribute('aria-label', 'Toggle dark mode');
themeBtn.innerHTML =
    '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' +
    '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

const navInner = document.querySelector('.nav-inner');
navInner.insertBefore(themeBtn, document.getElementById('hamburger'));

if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.dataset.theme = 'dark';
}

themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    if (isDark) {
        delete document.documentElement.dataset.theme;
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.dataset.theme = 'dark';
        localStorage.setItem('theme', 'dark');
    }
});

// ═══════ TEXT SCRAMBLE ═══════
const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

function scrambleText(text) {
    return text.replace(/[^\s]/g, () =>
        scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
    );
}

function scrambleDecode(el) {
    const parts = JSON.parse(el.dataset.scrambleParts);
    const textParts = parts.filter(p => p.type === 'text');
    const totalLen = textParts.reduce((s, p) => s + p.value.length, 0);
    let frame = 0;
    const totalFrames = totalLen + 15;

    function step() {
        let charIndex = 0;
        const html = parts.map(p => {
            if (p.type !== 'text') return p.value;
            let result = '';
            for (let i = 0; i < p.value.length; i++) {
                if (p.value[i] === ' ' || p.value[i] === '\n') {
                    result += p.value[i];
                } else if (charIndex < frame - 8) {
                    result += p.value[i];
                } else {
                    result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                }
                charIndex++;
            }
            return result;
        }).join('');
        el.innerHTML = html;
        frame++;
        if (frame <= totalFrames) {
            requestAnimationFrame(step);
        } else {
            el.innerHTML = parts.map(p => p.value).join('');
        }
    }
    step();
}

const scrambleEls = document.querySelectorAll('.text-scramble');
scrambleEls.forEach(el => {
    // Split innerHTML into text segments and HTML tags
    const raw = el.innerHTML;
    const parts = [];
    const tagRegex = /(<[^>]+>)/g;
    let lastIndex = 0;
    let match;
    while ((match = tagRegex.exec(raw)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ type: 'text', value: raw.slice(lastIndex, match.index) });
        }
        parts.push({ type: 'tag', value: match[1] });
        lastIndex = tagRegex.lastIndex;
    }
    if (lastIndex < raw.length) {
        parts.push({ type: 'text', value: raw.slice(lastIndex) });
    }
    el.dataset.scrambleParts = JSON.stringify(parts);
    // Show scrambled initially
    el.innerHTML = parts.map(p =>
        p.type === 'text' ? scrambleText(p.value) : p.value
    ).join('');
});

const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            scrambleDecode(entry.target);
            scrambleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

scrambleEls.forEach(el => scrambleObserver.observe(el));

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
