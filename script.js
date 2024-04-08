window.toggleMenu = function () {
    const menu = $(".menu");
    menu.toggleClass("active");
};

 // Función para ocultar el loader después de 2000 milisegundos
 window.addEventListener("load", function() {
    var loader = document.getElementById("loader");
    loader.style.opacity = "1"; // Hacer el loader transparente
    setTimeout(function() {
        loader.style.display = "none"; // Ocultar el loader después de la transición
        document.body.style.display = "block"; // Mostrar la página después de ocultar el loader
    }, 4000); // Esperar 500 ms antes de ocultar el loader
});



document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Obtener el valor del campo de búsqueda
    const query = document.getElementById('search-input').value.trim().toLowerCase();

    // Verificar si el campo de búsqueda está vacío
    if (query === "") {
        alert("Por favor, escriba algo para buscar.");
        return; // Salir de la función si el campo de búsqueda está vacío
    }

    // Obtener todo el texto del documento y convertirlo a minúsculas
    const allText = document.documentElement.innerText.toLowerCase();

    // Dividir el texto en palabras
    const words = allText.split(/\s+/);

    // Buscar palabras que contengan la consulta
    const matchingWords = words.filter(word => word.includes(query));

    // Mostrar las palabras coincidentes
    if (matchingWords.length > 0) {
        alert("Palabras encontradas que coinciden con su búsqueda:\n\n" + matchingWords.join("\n"));
    } else {
        alert("No se encontraron palabras que coincidan con su búsqueda.");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products-container");

    const products = [
        { name: "Cartera de Hilo", desc: "Diseño elegante y resistente", image: "img/munay_hilo.jpg" },
        { name: "Mochila de Hilo", desc: "Perfecta para llevar tus cosas", image: "img/munay_hilo3.jpg" },
        { name: "Alforja de hilo", desc: "Estilo y comodidad en uno", image: "img/munay_hilo1.jpg" },
        { name: "Mochila de Lana", desc: "Descripción del producto 4", image: "img/munay_hilo3.jpg" },
        { name: "Bolso de Lana", desc: "Descripción del producto 5", image: "img/munay_hilo.jpg" },
        { name: "Producto 6", desc: "Descripción del producto 6", image: "img/munay_hilo5.jpg" }
        // Añade más productos según sea necesario
    ];


 // Función para manejar la selección de productos
 function selectProduct(productId) {
    alert(`Producto ${productId} añadido al carrito`);
    cartCount++;
    updateCartCount();

    // Mostrar el carrito de compras después de hacer clic en un producto
    document.body.classList.add("cart-show");
}

// Función para actualizar el contador del carrito en la interfaz
function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cartCount;
}

 // Número de productos por página
 const productsPerPage = 3;

 // Calcular el número total de páginas
 const totalPages = Math.ceil(products.length / productsPerPage);

 // Inicializar la página actual
 let currentPage = 1;

 // Función para mostrar productos en la página actual
 function showProducts(page) {
     const startIndex = (page - 1) * productsPerPage;
     const endIndex = startIndex + productsPerPage;

     const currentProducts = products.slice(startIndex, endIndex);

     

     currentProducts.forEach((product, index) => {
         const productElement = document.createElement("div");
         productElement.classList.add("product");
         productElement.style.backgroundImage = `url('${product.image}')`;

         const overlay = document.createElement("div");
         overlay.classList.add("product-overlay");

         const productName = document.createElement("p");
         productName.classList.add("product-name");
         productName.textContent = product.name;

         const productDesc = document.createElement("p");
         productDesc.classList.add("product-desc");
         productDesc.textContent = product.desc;

         overlay.appendChild(productName);
         overlay.appendChild(productDesc);

         productElement.appendChild(overlay);
        
     });
 }

 // Mostrar productos en la primera página al cargar la página
 showProducts(currentPage);

 // Función para actualizar la paginación
function updatePagination() {
    const paginationContainer = document.getElementById("pagination-container");

    // Limpiar la paginación existente
    paginationContainer.innerHTML = '';

    // Crear números de página y agregarlos al contenedor de paginación
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("span");
        pageLink.textContent = i;
        pageLink.addEventListener("click", function () {
            currentPage = i;
            showProducts(currentPage); // Mostrar productos correspondientes a la página actual
            updatePagination(); // Actualizar la paginación después de cambiar de página
        });

        if (i === currentPage) {
            pageLink.classList.add("active");
        }

        paginationContainer.appendChild(pageLink);
    }
}


 // Inicializar la paginación
 updatePagination();

    
    // Función para simular añadir al carrito (puedes implementar lógica de carrito real aquí)
    window.addToCart = function (productId) {
        alert(`Producto añadido al carrito. ID: ${productId}`);
    };

});

// funcion del carrito 


function updateCartIndicator() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount.toString();
    }
}
const cartIcon = document.getElementById('cart-icon');
if (cartIcon) {
    cartIcon.addEventListener('click', showCartSummary);
}


// Función para actualizar el contador del carrito en la interfaz


// Evento de clic en un producto
productsContainer.addEventListener("click", function (event) {
    const productElement = event.target.closest(".product");
    if (productElement) {
        const productId = productElement.dataset.productId;
        selectProduct(productId);
    }
});
// En el script.js, define la función addToCart y showNotification

function addToCart(productName, priceNoCard, priceWithCard) {
    let cartList = document.getElementById('cart-list');
    let cartItem = document.createElement('li');
    cartItem.textContent = productName;

    // Obtener el precio dependiendo de si el cliente paga con tarjeta o no
    let price = priceNoCard;
    if (confirm("¿Va a pagar con tarjeta?")) {
        price = priceWithCard;
    }

    // Agregar el precio al carrito
    let priceItem = document.createElement('span');
    priceItem.textContent = 'Precio: S/ ' + price.toFixed(2);
    cartItem.appendChild(priceItem);

    cartList.appendChild(cartItem);
}


function showNotification(message, iconClass) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const icon = document.createElement('i');
    icon.className = iconClass; // Clase de Font Awesome para el icono de carrito
    
    const text = document.createElement('span');
    text.textContent = message;

    notification.appendChild(icon);
    notification.appendChild(text);

    document.body.appendChild(notification);

    // Remover la notificación después de un tiempo (puedes ajustar el tiempo)
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000); // 3000 milisegundos = 3 segundos
}

function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

function closeCartSummary() {
    const cartSummaryModal = document.getElementById('cart-summary-modal');
    if (cartSummaryModal) {
        cartSummaryModal.style.display = 'none';
    }
}

function updateCartIndicator() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount.toString();
    }
}

function updateCartList() {
    const cartList = document.getElementById('cart-list');
    if (cartList) {
        cartList.innerHTML = ''; // Limpiamos la lista antes de actualizar

        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartList.appendChild(listItem);
        });
    }
}