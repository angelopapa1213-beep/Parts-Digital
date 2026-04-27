const botones = document.querySelectorAll(".contenedor-del-2");

botones.forEach(boton => {
    boton.addEventListener("click", () => {

        document.querySelectorAll(".resultado").forEach(r => {
            if (r !== boton.nextElementSibling) {
                r.style.display = "none";
            }
        });

        const resultado = boton.nextElementSibling;
        if (resultado.style.display === "block") {
            resultado.style.display = "none";
        } else {
            resultado.style.display = "block";
        }
    });
});


const elementos = document.querySelectorAll(".milano");

function mostrar() {
    elementos.forEach(el => {
        const altura = el.getBoundingClientRect().top;
        const pantalla = window.innerHeight - 210;

        if (altura < pantalla) {
            el.classList.add("iniciador");
        }
    });
}

window.addEventListener("scroll", mostrar);

const sopitas = document.querySelectorAll(".sopita");
const sanos = document.querySelectorAll(".sano");

function most() {
    sopitas.forEach(el => {
        const altura = el.getBoundingClientRect().top;
        const pantalla = window.innerHeight - 210;

        if (altura < pantalla) {
            el.classList.add("mensajero");
        }
    });

    sanos.forEach(el => {
        const altura = el.getBoundingClientRect().top;
        const pantalla = window.innerHeight - 210;

        if (altura < pantalla) {
            el.classList.add("mens");
        }
    });
}

window.addEventListener("scroll", most);


 contenedor = document.getElementById('del');
let angulo = 0;

document.getElementById('Derecha').addEventListener('click', () => {
    angulo += 60;
    contenedor.style.transform = `rotateY(${angulo}deg)`;
});

document.getElementById('Izquierda').addEventListener('click', () => {
    angulo -= 60;
    contenedor.style.transform = `rotateY(${angulo}deg)`;
});