
const elementos = document.querySelectorAll('.animar');

const mostrarElementos = () => {
  const trigger = window.innerHeight * 0.85;

  elementos.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', mostrarElementos);
window.addEventListener('load', mostrarElementos);