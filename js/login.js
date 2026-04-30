document.querySelector(".bi-eye").addEventListener("click", ()=> {
    let contrasea = document.getElementById("contrase");
    let icono = document.getElementById("icono");

    if (contrasea.type === "password") {
        contrasea.type = "text";
        icono.classList.add("bi-eye-slash");
        icono.classList.remove("bi-eye");
    } else {
        contrasea.type = "password";
        icono.classList.remove("bi-eye-slash");
        icono.classList.add("bi-eye");
    }
});

let validacion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const correo = document.getElementById("Correo");
let mio = document.getElementById("mio");
let formu = document.getElementById("formu");

let passValida = false;
let correovalida = false;

correo.addEventListener("blur", () => {
    if (!validacion.test(correo.value)) {
        mio.textContent = "Correo inválido";
        mio.style.color = "red";
        correovalida = false;  
    } else {
        mio.textContent = "Correo válido";
        mio.style.color = "green";
        correovalida = true;   
    }
});

const password = document.getElementById("contrase");
let suyo = document.getElementById("suyo");

password.addEventListener("blur", () => {
    if (password.value.length < 6) {
        suyo.textContent = "La contraseña debe tener mínimo 6 caracteres";
        suyo.style.color = "red";
        passValida = false;  
    } else {
        suyo.textContent = "Contraseña válida";
        suyo.style.color = "green";
        passValida = true;    
    }
});

formu.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!correovalida || !passValida || correo.value === "" || password.value === "") {
        alert("Corrige los errores antes de continuar");
    } else {
        window.location.href = "index.html";
        alert("Has iniciado sesión correctamente.");
    }
});