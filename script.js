    // Definir productos disponibles
    const products = [
        { id: 1, name: "Pretal", price: 150, image: "https://mimale.com/2839-home_default/arnes-julius-k9-talla-1-l.jpg" },
        { id: 2, name: "Pelota 2 Knots", price: 100, image: "https://d22fxaf9t8d39k.cloudfront.net/7dc01d207f648021c08020f4870f7b62a11409088b941c725f65434a806b739a93683.jpeg" },
        { id: 3, name: "Cucha - Cucha", price: 220, image: "https://m.media-amazon.com/images/I/61WdUeR1UEL._AC_UF1000,1000_QL80_.jpg" },
        { id: 4, name: "Campera", price: 70, image: "https://http2.mlstatic.com/D_NQ_NP_945101-MLA75948072744_052024-O.webp"}
       
    ];

    // Función para mostrar los productos disponibles en la página
    function renderProducts() {
        const itemsContainer = document.getElementById('items-container');
        itemsContainer.innerHTML = '';
        products.forEach(product => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.innerHTML = `
                <h3>${product.name}</h3>
                <img src="${product.image}" alt="${product.name}">
                <p>Precio: $${product.price}</p>
                <button onclick="addToCart(${product.id})">Agregar al carrito</button>
            `;
            itemsContainer.appendChild(itemDiv);
        });
    }

    // Función para agregar un producto al carrito
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    }

    // Función para renderizar los elementos del carrito
    function renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            cartItemsContainer.appendChild(li);
        });
    }

    // Función para procesar el checkout
    function checkout() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        const total = cartItems.reduce((acc, item) => acc + item.price, 0);
        const confirmCheckout = confirm(`El total a pagar es: $${total}. ¿Desea proceder con el pago?`);
        if (confirmCheckout) {
            alert('¡Gracias por su compra, su compañero K9 estará feliz!');
            localStorage.removeItem('cartItems');
            renderCart();
        }
    }

    // Llamada a la función inicial para mostrar los productos disponibles
    renderProducts();
    // Renderizar el carrito al cargar la página
    renderCart();
