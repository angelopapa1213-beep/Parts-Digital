// Función para enviar la reserva
function enviarReserva() {
    // Limpiar errores
    document.querySelectorAll('.err').forEach(e => e.textContent = '');
    
    // Obtener valores
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const producto = document.getElementById('producto').value;
    const entrega = document.querySelector('input[name="entrega"]:checked');
    const pago = document.querySelector('input[name="pago"]:checked');
    const notas = document.getElementById('notas').value.trim();
    
    let isValid = true;
    
    // Validaciones
    if (!nombre) {
        document.getElementById('err-nombre').textContent = 'Nombre completo requerido';
        isValid = false;
    }
    
    if (!email) {
        document.getElementById('err-email').textContent = 'Correo electrónico requerido';
        isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
        document.getElementById('err-email').textContent = 'Ingresa un email válido';
        isValid = false;
    }
    
    if (!telefono) {
        document.getElementById('err-telefono').textContent = 'Teléfono requerido';
        isValid = false;
    } else if (telefono.length < 10) {
        document.getElementById('err-telefono').textContent = 'Teléfono debe tener al menos 10 dígitos';
        isValid = false;
    }
    
    if (!direccion) {
        document.getElementById('err-direccion').textContent = 'Dirección requerida';
        isValid = false;
    }
    
    if (!fecha) {
        document.getElementById('err-fecha').textContent = 'Fecha de entrega requerida';
        isValid = false;
    }
    
    if (!hora || hora === 'Selecciona una hora') {
        document.getElementById('err-hora').textContent = 'Hora preferida requerida';
        isValid = false;
    }
    
    if (!producto || producto === '¿Qué producto te interesa?') {
        document.getElementById('err-producto').textContent = 'Producto requerido';
        isValid = false;
    }
    
    if (!entrega) {
        document.getElementById('err-entrega').textContent = 'Selecciona método de entrega';
        isValid = false;
    }
    
    if (!pago) {
        document.getElementById('err-pago').textContent = 'Selecciona método de pago';
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Mostrar modal con resumen
    const entregaTexto = entrega.value === 'domicilio' ? 'A domicilio' : ' Retiro en tienda';
    const pagoTexto = pago.value === 'efectivo' ? ' Efectivo' : (pago.value === 'transferencia' ? ' Transferencia' : ' Tarjeta');
    
    document.getElementById('modalMsg').innerHTML = `<strong>${nombre}</strong>, tu reserva ha sido registrada exitosamente.`;
    document.getElementById('modalDetalle').innerHTML = `
        <strong> Producto:</strong> ${producto}<br>
        <strong> Entrega:</strong> ${fecha} - ${hora}<br>
        <strong>${entregaTexto}</strong><br>
        <strong>  Pago:</strong> ${pagoTexto}<br>
        ${notas ? `<strong>  Notas:</strong> ${notas}` : ''}
    `;
    
    document.getElementById('modalOverlay').classList.add('active');
    
    // Limpiar formulario
    document.getElementById('reservaForm').reset();
}

// Función para cerrar modal
function cerrarModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// Cerrar modal con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModal();
    }
});

// Cerrar modal al hacer clic fuera
document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        cerrarModal();
    }
});

// Validación en tiempo real para el teléfono (solo números)
document.getElementById('telefono').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9-]/g, '');
});