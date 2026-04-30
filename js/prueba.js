const ring = document.getElementById("ring");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

let angle = 0; // posición actual del carrusel

next.onclick = () => {
  angle -= 60;                // rota hacia la derecha
  ring.style.transform = `rotateY(${angle}deg)`;
};

prev.onclick = () => {
  angle += 60;                // rota hacia la izquierda
  ring.style.transform = `rotateY(${angle}deg)`;
};