/* =============================================
   MENÚ HAMBURGUESA
   ============================================= */
const hamburger = document.getElementById('hamburger');
const menuMovil = document.getElementById('menu-movil');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    menuMovil.classList.toggle('open');
});

// Cerrar menú al hacer clic en un enlace
menuMovil.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        menuMovil.classList.remove('open');
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !menuMovil.contains(e.target)) {
        hamburger.classList.remove('open');
        menuMovil.classList.remove('open');
    }
});

/* =============================================
   SCROLL TO TOP
   ============================================= */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =============================================
   GALERÍA 3D
   ============================================= */
let angulo = 0;
const carrusel3D = document.getElementById('del');

document.getElementById('Derecha').addEventListener('click', () => {
    angulo -= 60;
    carrusel3D.style.transform = `rotateY(${angulo}deg)`;
});

document.getElementById('Izquierda').addEventListener('click', () => {
    angulo += 60;
    carrusel3D.style.transform = `rotateY(${angulo}deg)`;
});

/* =============================================
   FAQ ACORDEÓN
   ============================================= */
document.querySelectorAll('.contenedor-del-2').forEach(btn => {
    btn.addEventListener('click', () => {
        const resultado = btn.closest('.dentro-del-2').querySelector('.resultado');
        const estaAbierto = btn.classList.contains('abierto');

        // Cerrar todos
        document.querySelectorAll('.contenedor-del-2').forEach(b => {
            b.classList.remove('abierto');
            b.closest('.dentro-del-2').querySelector('.resultado').classList.remove('visible');
        });

        // Abrir el clicado si estaba cerrado
        if (!estaAbierto) {
            btn.classList.add('abierto');
            resultado.classList.add('visible');
        }
    });
});

/* =============================================
   REVEAL ON SCROLL
   ============================================= */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 120);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-section, .reveal-card').forEach(el => {
    revealObserver.observe(el);
});

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id], article[id]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));