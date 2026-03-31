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