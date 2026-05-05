// ════ Fade-in al hacer scroll ════
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ════ Menú hamburguesa ════
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

// ════ Header con fondo más sólido al hacer scroll ════
window.addEventListener('scroll', () => {
  document.getElementById('header').style.background =
    window.scrollY > 60 ? 'rgba(6,6,8,0.98)' : 'rgba(6,6,8,0.95)';
});