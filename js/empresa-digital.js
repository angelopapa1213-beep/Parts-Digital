// =======================
// 🔍 BUSCADOR
// =======================
const buscador = document.getElementById("buscador");
const productos = document.querySelectorAll(".primer-aside");

buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();

    productos.forEach(producto => {
        const nombre = producto.querySelector("h1").innerText.toLowerCase();
        const desc = producto.querySelector("p").innerText.toLowerCase();

        if (nombre.includes(texto) || desc.includes(texto)) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }
    });
});


// =======================
// 🛒 CARRITO
// =======================
let carrito = [];

const botones = document.querySelectorAll(".pedidos");
const contadorHTML = document.getElementById("contador");

// AGREGAR AL CARRITO
botones.forEach(boton => {
    boton.addEventListener("click", () => {

        const producto = boton.closest(".segundo-div");

        const nombre = producto.querySelector("h1").innerText;
        const precioTexto = producto.querySelector("#precios div").innerText;

        const precio = parseFloat(precioTexto.replace(/[^0-9.]/g, ""));

        carrito.push({ nombre, precio });

        // actualizar contador
        contadorHTML.innerText = carrito.length;

        // animación botón
        boton.innerText = "✔ Agregado";
        boton.style.background = "#28a745";

        setTimeout(() => {
            boton.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Ordenar`;
            boton.style.background = "";
        }, 1000);

    });
});


// =======================
// 🧾 MOSTRAR CARRITO
// =======================
const iconoCarrito = document.getElementById("carrito-icono");

iconoCarrito.addEventListener("click", () => {

    if (carrito.length === 0) {
        alert("El carrito está vacío 🛒");
        return;
    }

    let lista = "🛒 TUS PRODUCTOS:\n\n";
    let total = 0;

    carrito.forEach((item, index) => {
        lista += `${index + 1}. ${item.nombre} - RD$${item.precio}\n`;
        total += item.precio;
    });

    lista += `\n----------------------\nTOTAL: RD$${total}`;

    alert(lista);
});


// =======================
// 📤 BOTÓN COMPARTIR
// =======================
const botonesCompartir = document.querySelectorAll(".compartir");

botonesCompartir.forEach(boton => {
    boton.addEventListener("click", () => {

        const producto = boton.closest(".segundo-div");
        const nombre = producto.querySelector("h1").innerText;

        const mensaje = `Mira este producto en Digital Parts: ${nombre}`;

        if (navigator.share) {
            navigator.share({
                title: "Digital Parts",
                text: mensaje,
                url: window.location.href
            });
        } else {
            // fallback (WhatsApp)
            const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
            window.open(url, "_blank");
        }
    });
});