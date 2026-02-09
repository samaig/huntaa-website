// Initialize Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Logic
    const toggle = document.getElementById('themeBtn');
    const html = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved) html.setAttribute('data-theme', saved);

    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // 2. Scroll to Top
    const scrollBtn = document.getElementById('scrollTop');
    const circle = document.querySelector('.scroll-loader circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        circle.style.strokeDashoffset = circumference - (scrollPercent * circumference);

        if (scrollTop > 300) scrollBtn.classList.add('visible');
        else scrollBtn.classList.remove('visible');
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

    // 3. Mobile Menu (Drawer with Overlay)
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileOverlay');
    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
        menu.classList.toggle('open', isOpen);
        overlay.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    window.closeMenu = () => {
        if (isOpen) toggleMenu();
    };

    // 4. Fade In Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('visible');
        });
    }, {threshold: 0.1});
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});