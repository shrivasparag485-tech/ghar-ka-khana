// Get Cart
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save Cart
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add To Cart
function addToCart(name, price) {
    let cart = getCart();

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    saveCart(cart);
    alert("Item added to cart!");
}

// Display Cart
function displayCart() {
    const cartItems = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");

    if (!cartItems) return;

    let cart = getCart();
    let total = 0;
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div style="margin-bottom:15px;">
                ${item.name} - ₹${item.price} x ${item.quantity}
                <button onclick="increaseQty(${index})">+</button>
                <button onclick="decreaseQty(${index})">-</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalPriceElement.textContent = "Total: ₹" + total;
}

// Increase Quantity
function increaseQty(index) {
    let cart = getCart();
    cart[index].quantity++;
    saveCart(cart);
    displayCart();
}

// Decrease Quantity
function decreaseQty(index) {
    let cart = getCart();
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    saveCart(cart);
    displayCart();
}

// Remove Item
function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
}

// Place Order
function placeOrder() {

    const isLoggedIn = localStorage.getItem("loggedIn");

    // If not logged in → redirect to login
    if (!isLoggedIn) {

        // Save intent that user wanted to order
        localStorage.setItem("redirectAfterLogin", "cart");

        window.location.href = "login_.html";
        return;
    }

    // If logged in → place order
    completeOrder();
}


// Separate order logic
function completeOrder() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!cart.length) {
        alert("Cart is empty!");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
        userEmail: currentUser.email,
        items: cart,
        date: new Date().toLocaleString()
    };

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    alert("Order Placed Successfully! 🎉");

    window.location.href = "payment.html";
}
// Load Cart on Page Load
document.addEventListener("DOMContentLoaded", displayCart);

// ===== CATEGORY FILTER =====
function filterCategory(category) {
    const items = document.querySelectorAll(".food-card");

    items.forEach(item => {
        if (category === "all") {
            item.style.display = "block";
        } else {
            if (item.getAttribute("data-category") === category) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        }
    });
}

// ===== LIVE SEARCH =====
const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        const value = this.value.toLowerCase();
        const items = document.querySelectorAll(".food-card");

        items.forEach(item => {
            const name = item.querySelector("h3").textContent.toLowerCase();

            if (name.includes(value)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
}
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        let totalItems = 0;
        cart.forEach(item => {
            totalItems += item.quantity;
        });
        cartCount.textContent = totalItems;
    }
}

document.addEventListener("DOMContentLoaded", updateCartCount);
updateCartCount();