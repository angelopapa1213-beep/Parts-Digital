/* ================================================
   DIGITAL PARTS — main.js
   ================================================
   INSTRUCCIONES EMAILJS (solo una vez):
   1. Crea cuenta gratis en https://emailjs.com
   2. Agrega un "Email Service" (Gmail, Outlook, etc.)
   3. Crea un "Email Template" con estas variables:
        {{from_name}}   → nombre del cliente
        {{from_email}}  → correo del cliente
        {{service_type}}→ tipo de servicio
        {{message}}     → mensaje
   4. Copia tu Service ID, Template ID y Public Key
   5. Reemplaza los valores en EMAILJS_CONFIG abajo
   ================================================ */

const EMAILJS_CONFIG = {
  serviceId:  'TU_SERVICE_ID',   // ej: 'service_abc123'
  templateId: 'TU_TEMPLATE_ID',  // ej: 'template_xyz789'
  publicKey:  'TU_PUBLIC_KEY'    // ej: 'user_AbCdEfGhIj'
};

/* ================================================
   MENÚ HAMBURGER
   ================================================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ================================================
   REVEAL AL HACER SCROLL
   ================================================ */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(r => revealObserver.observe(r));

/* ================================================
   BOTÓN SCROLL TO TOP
   ================================================ */
const scrollBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('show', window.scrollY > 500);
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ================================================
   SOMBRA DEL HEADER AL HACER SCROLL
   ================================================ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 50
    ? '0 2px 30px rgba(0,0,0,0.4)'
    : 'none';
});

/* ================================================
   FORMULARIO DE CONTACTO CON VALIDACIÓN JS
   ================================================ */
(function () {

  /* --- Referencias a elementos del DOM --- */
  const campos = {
    nombre:   { el: document.getElementById('f-nombre'),   msg: document.getElementById('msg-nombre')   },
    email:    { el: document.getElementById('f-email'),    msg: document.getElementById('msg-email')    },
    servicio: { el: document.getElementById('f-servicio'), msg: document.getElementById('msg-servicio') },
    mensaje:  { el: document.getElementById('f-mensaje'),  msg: document.getElementById('msg-mensaje')  }
  };

  const btnEnviar   = document.getElementById('btn-enviar');
  const btnText     = document.getElementById('btn-text');
  const btnIcon     = document.getElementById('btn-icon');
  const spinner     = document.getElementById('form-spinner');
  const successBox  = document.getElementById('success-box');
  const charCount   = document.getElementById('char-count');

  /* --- Funciones de validación --- */
  function esNombreValido(v)    { return v.trim().length >= 2; }
  function esEmailValido(v)     { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }
  function esServicioValido(v)  { return v !== ''; }
  function esMensajeValido(v)   { return v.trim().length >= 10; }

  /* --- Aplica estado visual (ok / error / neutro) --- */
  function setEstado(nombre, estado, texto) {
    const { el, msg } = campos[nombre];
    el.classList.remove('valid', 'error');
    msg.classList.remove('ok', 'err');
    msg.textContent = texto || '';
    if (estado === true)  { el.classList.add('valid'); msg.classList.add('ok'); }
    if (estado === false) { el.classList.add('error'); msg.classList.add('err'); }
  }

  /* ------------------------------------------------
     VALIDACIÓN EN TIEMPO REAL — campo por campo
  ------------------------------------------------ */

  /* Nombre */
  campos.nombre.el.addEventListener('input', function () {
    if (!this.value) return setEstado('nombre', null);
    const ok = esNombreValido(this.value);
    setEstado('nombre', ok, ok ? '¡Perfecto!' : 'Escribe al menos 2 caracteres.');
  });

  campos.nombre.el.addEventListener('blur', function () {
    if (!this.value) setEstado('nombre', false, 'El nombre es obligatorio.');
  });

  /* Email */
  campos.email.el.addEventListener('input', function () {
    if (!this.value) return setEstado('email', null);
    const ok = esEmailValido(this.value);
    setEstado('email', ok, ok ? 'Correo válido.' : 'Formato incorrecto. Ej: nombre@correo.com');
  });

  campos.email.el.addEventListener('blur', function () {
    if (!this.value) setEstado('email', false, 'El correo es obligatorio.');
  });

  /* Servicio */
  campos.servicio.el.addEventListener('change', function () {
    const ok = esServicioValido(this.value);
    setEstado('servicio', ok, ok ? '' : 'Selecciona un tipo de servicio.');
  });

  /* Mensaje + contador de caracteres */
  campos.mensaje.el.addEventListener('input', function () {
    const len = this.value.length;
    charCount.textContent = len + ' / 500';
    charCount.className = 'char-count' + (len > 450 ? ' over' : len > 350 ? ' warn' : '');
    if (!this.value) return setEstado('mensaje', null);
    const ok = esMensajeValido(this.value);
    setEstado('mensaje', ok, ok ? '' : 'Escribe al menos 10 caracteres.');
  });

  campos.mensaje.el.addEventListener('blur', function () {
    if (!this.value) setEstado('mensaje', false, 'El mensaje es obligatorio.');
  });

  /* ------------------------------------------------
     ENVÍO DEL FORMULARIO
  ------------------------------------------------ */
  btnEnviar.addEventListener('click', function () {

    /* 1. Validar todos los campos */
    let formularioValido = true;

    if (!esNombreValido(campos.nombre.el.value)) {
      setEstado('nombre', false, 'Por favor ingresa tu nombre.');
      formularioValido = false;
    }
    if (!esEmailValido(campos.email.el.value)) {
      setEstado('email', false, 'Ingresa un correo válido.');
      formularioValido = false;
    }
    if (!esServicioValido(campos.servicio.el.value)) {
      setEstado('servicio', false, 'Selecciona un tipo de servicio.');
      formularioValido = false;
    }
    if (!esMensajeValido(campos.mensaje.el.value)) {
      setEstado('mensaje', false, 'El mensaje debe tener al menos 10 caracteres.');
      formularioValido = false;
    }

    if (!formularioValido) {
      /* Hacer scroll hasta el primer campo con error */
      const primerError = document.querySelector('.form-group input.error, .form-group select.error, .form-group textarea.error');
      if (primerError) primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    /* 2. Mostrar estado "enviando" */
    btnEnviar.disabled = true;
    btnIcon.style.display = 'none';
    btnText.textContent = 'Enviando…';
    spinner.style.display = 'block';

    /* 3. Construir parámetros para EmailJS */
    const templateParams = {
      from_name:    campos.nombre.el.value.trim(),
      from_email:   campos.email.el.value.trim(),
      service_type: campos.servicio.el.value,
      message:      campos.mensaje.el.value.trim()
    };

    /* 4. Enviar con EmailJS */
    if (typeof emailjs !== 'undefined') {
      emailjs
        .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
        .then(function () {
          mostrarExito();
        })
        .catch(function (err) {
          console.error('EmailJS error:', err);
          alert('Hubo un problema al enviar el mensaje. Por favor intenta de nuevo o contáctanos por WhatsApp.');
          resetBoton();
        });
    } else {
      /* EmailJS no cargó — muestra aviso en consola y simula éxito en desarrollo */
      console.warn('EmailJS no está cargado. Asegúrate de incluir el script y tu Public Key.');
      setTimeout(mostrarExito, 1500);
    }
  });

  /* ------------------------------------------------
     FUNCIONES AUXILIARES
  ------------------------------------------------ */

  function mostrarExito() {
    /* Ocultar botón y mostrar mensaje de éxito */
    btnEnviar.style.display = 'none';
    successBox.classList.add('show');

    /* Limpiar formulario */
    Object.values(campos).forEach(c => {
      c.el.value = '';
      c.el.classList.remove('valid', 'error');
      c.msg.textContent = '';
      c.msg.classList.remove('ok', 'err');
    });
    if (charCount) charCount.textContent = '0 / 500';
  }

  function resetBoton() {
    btnEnviar.disabled = false;
    btnIcon.style.display = '';
    btnText.textContent = '\u00a0Enviar mensaje';
    spinner.style.display = 'none';
  }

})();