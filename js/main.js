/* ============================================
   THR33 IT SOLUTIONS - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navList = document.getElementById('mainNav');
    if (menuBtn && navList) {
        menuBtn.addEventListener('click', () => {
            const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !expanded);
            navList.classList.toggle('mobile-open');
            document.body.style.overflow = expanded ? '' : 'hidden';
        });
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('mobile-open');
                menuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // Header scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.pageYOffset > 80 ? '0 1px 20px rgba(0,0,0,0.3)' : 'none';
    }, { passive: true });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.service-card, .product-card, .why-us-item, .process-step, .privacy-card, .value-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Contact form
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('formName');
            const message = document.getElementById('formMessage');
            let valid = true;
            [name, message].forEach(field => {
                if (field && !field.value.trim()) {
                    valid = false;
                    field.style.borderColor = '#ef4444';
                } else if (field) {
                    field.style.borderColor = 'var(--color-dark-border)';
                }
            });
            if (valid) {
                const service = document.getElementById('formService')?.value || 'No especificado';
                const phone = document.getElementById('formPhone')?.value || '';
                const email = document.getElementById('formEmail')?.value || '';
                const msg = encodeURIComponent(`Hola, soy ${name.value}.\nServicio: ${service}\nTeléfono: ${phone}\nCorreo: ${email}\n\nMensaje: ${message.value}`);
                window.open(`https://wa.me/5214691131272?text=${msg}`, '_blank');
                form.reset();
            }
        });
    }
});