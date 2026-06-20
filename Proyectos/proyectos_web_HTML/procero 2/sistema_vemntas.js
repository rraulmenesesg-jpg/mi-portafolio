
const productos = [
    { id: 1, nombre:"playera",precio: 399, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCaxqVpdfASAyfVtsSI9E20_2OLdgXx4ghVQ&s" },
    { id: 2, nombre:"pantalon",precio:550, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjDiowD3__IzEC43nxbhVZXFMokviyr-at7A&s" },
    { id: 3, nombre:"chamarra",precio:700, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjufHBEh1UKqKqjqbn8k6JycGe6XS0lF-2sA&s" },
    { id: 4, nombre:"sudadera",precio:600, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAdDMaT7vp4Jgm9B7FDxMc_e0ZCqBluauwzw&s" },
    { id: 5, nombre:"camisa",precio:300, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq7UAiwmnRiKUTHZzbf_j21TBB4iJ5zi1NSg&s" },
    { id: 6, nombre:"bufanda",precio:150, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjkabQfoe50J8UmYdd8r48MeYL0e6RtyMGJg&s" },
    { id: 7, nombre:"tenis",precio:1200, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrjcRuHA3SShk9llBGYNnssWTWQvpKZST4WA&s" },
    { id: 8, nombre:"pants",precio: 600, imagen: "https://cdn-images.farfetch-contents.com/24/98/91/43/24989143_55189595_600.jpg" },
    { id: 9, nombre:"cadena",precio:90, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI68I6uUIXW8w7T_Nj9PFe7uumUaHElTDfKg&s" },
    { id: 10, nombre:"top",precio:200, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsx6ErxedkkGpSNcIYCDk-meTDNMrGDjAY8w&s" }
];

let carrito = [];
function renderProductos() {
    const contenedor_prod = document.getElementById("productosGrid");
    contenedor_prod.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        let prod = productos[i];
        const card = document.createElement("div");
        card.className = "producto-card";
        card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <div class="producto-info">
            <h3>${prod.nombre}</h3>
            <div class="precio">$${prod.precio}</div>
            <button class="btn-agregar" onclick="agregarAlCarrito(${prod.id})">
                Agregar al carrito
            </button>
        </div>
        `;
        contenedor_prod.appendChild(card);
    }
}

function agregarAlCarrito(id) {
    let productoEncontrado = null;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            productoEncontrado = productos[i];
            break; 
        }
    }
    let existe = null;
    for (let j = 0; j < carrito.length; j++) {
        if (carrito[j].id === id) {
            existe = carrito[j];
            break;
        }
    }
    if (existe) {
        existe.cantidad++;
    } else {
        let nuevoItem = {
            id: productoEncontrado.id,
            nombre: productoEncontrado.nombre,
            precio: productoEncontrado.precio,
            cantidad: 1
        };
        carrito.push(nuevoItem);
    }
    renderCarrito();
}

function cambiarCantidad(id, cambio) {
    let item = null;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            item = carrito[i];
        }
    }
    if (item !== null) {
        item.cantidad = item.cantidad + cambio;
        if (item.cantidad < 1) {
            item.cantidad = 1;
        }
        renderCarrito();
    }
}

function eliminarDelCarrito(id) {
    let nuevoCarrito = [];
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id !== id) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    carrito = nuevoCarrito;
    renderCarrito();
}

function calcularTotales() {
    let subtotal = 0;
    for (const item of carrito) {  
        subtotal += item.precio * item.cantidad;
    }
      const descuento = subtotal > 2000 ? Math.round(subtotal * 0.10) : 0;
    const totalFinal = subtotal - descuento;
    return { subtotal, descuento, totalFinal };
}

function renderCarrito() {
    const container = document.getElementById("cartItems");
    container.innerHTML = "";

    if (carrito.length === 0) {
        document.getElementById("subtotal").textContent = "$0";
        document.getElementById("totalFinal").textContent = "$0";
        return;
    }

    for (let i = 0; i < carrito.length; i++) {
        let item = carrito[i];
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
        <div class="cart-item-info">
            <strong>${item.nombre}</strong><br>
            <small>$${item.precio} c/u</small>
        </div>
        <div style="text-align:right;">
            <strong>$${(item.precio * item.cantidad)}</strong><br>
        </div>
        `;
        container.appendChild(div);
    }
    const totales = calcularTotales();
    document.getElementById("subtotal").textContent = "$" + totales.subtotal;
    document.getElementById("totalFinal").textContent = "$" + totales.totalFinal;
}

function vaciarCarrito() {
    if (confirm("¿Quieres vaciar todo el carrito?")) {
        carrito = [];
        renderCarrito();
    }
}
function calcularTotales() {
    let subtotal = 0;
    let montoMinimoParaDescuento = 2000; 
    for (let i = 0; i < carrito.length; i++) {
        subtotal = subtotal + (carrito[i].precio * carrito[i].cantidad);
    }
    let descuento = 0;

    if (subtotal > montoMinimoParaDescuento) {
        descuento = subtotal * 0.10; 
    } else {
        descuento = 0;
    }
    let totalFinal = subtotal - descuento;
    return { 
        subtotal: subtotal, 
        descuento: descuento, 
        totalFinal: totalFinal 
    };
}

renderProductos();
renderCarrito();