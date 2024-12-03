let waifus = [];
let cart = [];

async function loadWaifus(type = '', count = 9) {
    try {
        const url = `https://api.waifu.pics/sfw/${type || 'waifu'}`;
        const waifuArray = [];
        for (let i = 0; i < count; i++) {
            const response = await fetch(url);
            const data = await response.json();
            waifuArray.push({ url: data.url, price: getRandomPrice(10, 100) });
        }
        waifus = waifuArray;
        displayWaifus(waifus);
    } catch (error) {
        console.error("Error al cargar waifus:", error);
    }
}

function getRandomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayWaifus(waifus) {
    const waifuList = document.getElementById('waifuList');
    waifuList.innerHTML = '';
    waifus.forEach(waifu => {
        const card = document.createElement('div');
        card.className = 'waifu-card';
        card.innerHTML = `
            <img src="${waifu.url}" alt="Waifu">
            <p>Precio: $${waifu.price}</p>
            <button class="button-buy" onclick="addToCart('${waifu.url}', ${waifu.price})">Comprar</button>
        `;
        waifuList.appendChild(card);
    });
}

function addToCart(url, price) {
    cart.push({ url, price });
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';
    let subtotal = 0;
    cart.forEach((item, index) => {
        subtotal += item.price;
        cartList.innerHTML += `
            <li class="cart-item">
                <img src="${item.url}" alt="Producto">
                <span>Precio: $${item.price}</span>
                <button class="button-remove" onclick="removeFromCart(${index})">Eliminar</button>
            </li>
        `;
    });

    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    document.getElementById('subtotal').innerText = `Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById('iva').innerText = `IVA (16%): $${iva.toFixed(2)}`;
    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function completePurchase() {
    alert("Compra realizada con éxito!");
    cart = [];
    updateCart();
}

function filterWaifus() {
    const type = document.getElementById('typeFilter').value;
    loadWaifus(type);
}

window.onload = () => {
    loadWaifus();
};
async function fetchAnimeImage() {
    try {
        const response = await fetch('https://api.waifu.pics/nsfw/waifu');
        const data = await response.json();
        document.getElementById('animeImage').src = data.url;
    } catch (error) {
        console.error("Error al obtener la imagen de waifu:", error);
    }
}

fetchAnimeImage();
