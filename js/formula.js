// ── Mostrar / ocultar contraseña ──
const togglePass = document.getElementById('togglePass');
const passInput  = document.getElementById('password');

togglePass.addEventListener('click', () => {
    if (passInput.type === 'password') {
        passInput.type = 'text';
        togglePass.textContent = 'Ocultar';
    } else {
        passInput.type = 'password';
        togglePass.textContent = '👁 Ver';
    }
});

// ── Medidor de fuerza de contraseña ──
const fuerzaBarra = document.getElementById('fuerzaBarra');
const fuerzaTexto = document.getElementById('fuerzaTexto');

passInput.addEventListener('input', () => {
    const val = passInput.value;
    let puntos = 0;

    if (val.length >= 6)           puntos++;
    if (val.length >= 10)          puntos++;
    if (/[A-Z]/.test(val))         puntos++;
    if (/[0-9]/.test(val))         puntos++;
    if (/[^A-Za-z0-9]/.test(val))  puntos++;

    const niveles = [
        { ancho: '0%',   color: '#2a2a4a', texto: '' },
        { ancho: '25%',  color: '#e74c3c', texto: '🔴 Muy débil' },
        { ancho: '50%',  color: '#e67e22', texto: '🟠 Débil' },
        { ancho: '70%',  color: '#f1c40f', texto: '🟡 Media' },
        { ancho: '85%',  color: '#2ecc71', texto: '🟢 Fuerte' },
        { ancho: '100%', color: '#27ae60', texto: '✅ Muy fuerte' },
    ];

    fuerzaBarra.style.width           = niveles[puntos].ancho;
    fuerzaBarra.style.backgroundColor = niveles[puntos].color;
    fuerzaTexto.textContent           = niveles[puntos].texto;
});

// ── Validación en tiempo real ──
document.getElementById('firstName').addEventListener('blur', function() {
    const err = document.getElementById('errNombre');
    if (this.value.trim().length < 2) {
        this.classList.add('invalido');
        this.classList.remove('valido');
        err.style.display = 'block';
    } else {
        this.classList.add('valido');
        this.classList.remove('invalido');
        err.style.display = 'none';
    }
});

document.getElementById('email').addEventListener('blur', function() {
    const err = document.getElementById('errCorreo');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(this.value)) {
        this.classList.add('invalido');
        this.classList.remove('valido');
        err.style.display = 'block';
    } else {
        this.classList.add('valido');
        this.classList.remove('invalido');
        err.style.display = 'none';
    }
});

passInput.addEventListener('blur', function() {
    const err = document.getElementById('errPass');
    if (this.value.length < 6) {
        this.classList.add('invalido');
        this.classList.remove('valido');
        err.style.display = 'block';
    } else {
        this.classList.add('valido');
        this.classList.remove('invalido');
        err.style.display = 'none';
    }
});

// ── Envío del formulario ──
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('firstName').value.trim();
    const correo = document.getElementById('email').value.trim();
    const pass   = passInput.value;
    const regex  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nombre.length < 2) {
        mostrarAlerta('❌ Ingresa tu nombre completo.', 'error');
        return;
    }
    if (!regex.test(correo)) {
        mostrarAlerta('❌ El correo electrónico no es válido.', 'error');
        return;
    }
    if (pass.length < 6) {
        mostrarAlerta('❌ La contraseña debe tener al menos 6 caracteres.', 'error');
        return;
    }

    const btn     = document.getElementById('btnEnviar');
    const spinner = document.getElementById('spinner');
    btn.style.display     = 'none';
    spinner.style.display = 'block';

    this.submit();
});

function mostrarAlerta(msg, tipo) {
    const alerta = document.getElementById('alerta');
    alerta.textContent = msg;
    alerta.className   = 'alerta ' + tipo;
}

// ── Leer respuesta del PHP por URL ──
const params = new URLSearchParams(window.location.search);
if (params.get('status') === 'ok') {
    mostrarAlerta('✅ Cuenta creada correctamente. ¡Bienvenido!', 'success');
} else if (params.get('status') === 'error') {
    mostrarAlerta('❌ ' + (params.get('msg') || 'Error al registrar.'), 'error');
} else if (params.get('status') === 'duplicado') {
    mostrarAlerta('⚠️ Este correo ya está registrado.', 'error');
}