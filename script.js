// Backpacker Journal — Main Script
document.addEventListener('DOMContentLoaded', function () {

    // ——— Mobile menu toggle ———
    const mobileBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        mobileMenu.querySelectorAll('a').forEach(link =>
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'))
        );
    }

    // ——— Navbar scroll effect ———
    const nav = document.querySelector('.bj-nav');
    if (nav) {
        const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ——— Smooth scroll for anchor links ———
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.getElementById(this.getAttribute('href').substring(1));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ——— Scroll reveal ———
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ——— Real stories slider ———
    const realStoriesSlider = document.getElementById('real-stories-slider');
    if (realStoriesSlider) {
        const images = realStoriesSlider.querySelectorAll('.slider-image');
        const dots = document.getElementById('real-stories-dots');
        const prevBtn = document.getElementById('real-stories-prev');
        const nextBtn = document.getElementById('real-stories-next');
        let current = 0;
        let interval = null;

        const show = (i) => {
            images.forEach((img, idx) => img.style.opacity = idx === i ? '1' : '0');
            if (dots) {
                dots.querySelectorAll('span').forEach((dot, idx) => {
                    dot.className = idx === i
                        ? 'bj-slider-dot active h-1.5 rounded-full'
                        : 'bj-slider-dot inactive h-1.5 rounded-full';
                });
            }
            current = i;
        };

        const start = () => {
            if (interval) return;
            interval = setInterval(() => show((current + 1) % images.length), 3000);
        };

        const stop = () => {
            if (!interval) return;
            clearInterval(interval);
            interval = null;
        };

        realStoriesSlider.addEventListener('mouseenter', stop);
        realStoriesSlider.addEventListener('mouseleave', start);

        if (prevBtn) prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); stop();
            show((current - 1 + images.length) % images.length);
        });
        if (nextBtn) nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); stop();
            show((current + 1) % images.length);
        });

        show(0);
        start();
    }

    // ——— Newsletter form handling ———
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]');
            if (email && email.value) {
                alert('Thank you for subscribing! You\'ll receive our latest travel updates soon.');
                email.value = '';
            }
        });
    });

    // ——— Contact form handling ———
    const contactForm = document.querySelector('form[action*="formspree"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const name = this.querySelector('input[name="name"]');
            const email = this.querySelector('input[name="email"]');
            const message = this.querySelector('textarea[name="message"]');
            if (!name?.value || !email?.value || !message?.value) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    }

    // ——— Scroll to top button ———
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>';
    scrollBtn.className = 'fixed bottom-8 right-8 text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 pointer-events-none z-50';
    scrollBtn.id = 'scroll-to-top';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function () {
        scrollBtn.classList.toggle('opacity-0', window.pageYOffset <= 300);
        scrollBtn.classList.toggle('pointer-events-none', window.pageYOffset <= 300);
        scrollBtn.classList.toggle('opacity-100', window.pageYOffset > 300);
    }, { passive: true });

    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // ——— Category filter buttons (guides page) ———
    document.querySelectorAll('.bj-filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.bj-filter-btn').forEach(b => {
                b.classList.remove('bg-terra-500', 'text-white');
                b.classList.add('bg-taupe-100', 'text-charcoal-700');
            });
            this.classList.remove('bg-taupe-100', 'text-charcoal-700');
            this.classList.add('bg-terra-500', 'text-white');
        });
    });

    console.log('Backpacker Journal loaded');
});
