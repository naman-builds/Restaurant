// ---------- MENU DATA ----------
// Put your own photos in an "images" folder and match the file names below.
// If an image is missing, the emoji shows instead.
var menu = [
    { id: 1,  name: "Paneer Tikka",          category: "Starters",    price: 220, img: "panner-tikka.jpeg",  emoji: "🍢", desc: "Smoky grilled paneer cubes." },
    { id: 2,  name: "Veg Spring Rolls",      category: "Starters",    price: 160, img: "spring rolls.jpeg",  emoji: "🥟", desc: "Crispy rolls with sweet chilli dip." },
    { id: 3,  name: "Chilli Potato",         category: "Starters",    price: 140, img: "chilli-potato.jpeg", emoji: "🥔", desc: "Spicy, crunchy and dangerously snackable." },
    { id: 4,  name: "Butter Chicken",        category: "Main Course", price: 320, img: "butter-chicken.jpg", emoji: "🍗", desc: "Creamy tomato gravy, tender chicken." },
    { id: 5,  name: "Dal Makhani",           category: "Main Course", price: 240, img: "dal-makhani.jpg",   emoji: "🍲", desc: "Slow-cooked black lentils." },
    { id: 6,  name: "Paneer Butter Masala",  category: "Main Course", price: 280, img: "paneer-masala.jpg", emoji: "🧀", desc: "Soft paneer in rich buttery gravy." },
    { id: 7,  name: "Veg Biryani",           category: "Main Course", price: 260, img: "veg-biryani.jpg",   emoji: "🍛", desc: "Fragrant rice with veggies and spices." },
    { id: 8,  name: "Gulab Jamun",           category: "Desserts",    price: 90,  img: "gulab-jamun.jpeg",   emoji: "🍮", desc: "Warm, syrupy and gone in seconds." },
    { id: 9,  name: "Brownie with Ice Cream", category: "Desserts",   price: 150, img: "brownie.jpg",       emoji: "🍫", desc: "Hot brownie, cold ice cream." },
    { id: 10, name: "Mango Lassi",           category: "Drinks",      price: 90,  img: "mango-lassi.jpeg",   emoji: "🥭", desc: "Thick, sweet and chilled." },
    { id: 11, name: "Masala Chai",           category: "Drinks",      price: 40,  img: "masala-chai.jpg",   emoji: "☕", desc: "Strong tea with spices." },
    { id: 12, name: "Cold Coffee",           category: "Drinks",      price: 110, img: "cold-coffee.jpeg",   emoji: "🥤", desc: "Creamy iced coffee." }
];

var cart = {};              // stores id -> quantity
var currentCategory = "All";

// ---------- SHOW MENU ----------
function showMenu() {
    var grid = document.getElementById("menu-grid");
    var html = "";

    for (var i = 0; i < menu.length; i++) {
        var item = menu[i];

        if (currentCategory === "All" || item.category === currentCategory) {
            html += '<div class="food-card">';
            html += '  <div class="img-box">' + item.emoji;
            html += '    <img src="' + item.img + '" alt="' + item.name + '" onerror="this.style.display=\'none\'">';
            html += '  </div>';
            html += '  <div class="food-info">';
            html += '    <h3>' + item.name + '</h3>';
            html += '    <p>' + item.desc + '</p>';
            html += '    <div class="price-row">';
            html += '      <span class="price">&#8377;' + item.price + '</span>';
            html += '      <button class="add-btn" onclick="addToCart(' + item.id + ')">Add</button>';
            html += '    </div>';
            html += '  </div>';
            html += '</div>';
        }
    }

    grid.innerHTML = html;
}

// ---------- FILTER ----------
function filterMenu(category) {
    currentCategory = category;
    showMenu();

    var buttons = document.getElementsByClassName("filter-btn");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
        if (buttons[i].textContent === category) {
            buttons[i].classList.add("active");
        }
    }
}

// ---------- CART ----------
function findItem(id) {
    for (var i = 0; i < menu.length; i++) {
        if (menu[i].id === id) {
            return menu[i];
        }
    }
}

function addToCart(id) {
    if (cart[id]) {
        cart[id] = cart[id] + 1;
    } else {
        cart[id] = 1;
    }
    showCart();
}

function changeQty(id, change) {
    cart[id] = cart[id] + change;
    if (cart[id] <= 0) {
        delete cart[id];
    }
    showCart();
}

function showCart() {
    var box = document.getElementById("cart-items");
    var html = "";
    var total = 0;
    var count = 0;

    for (var id in cart) {
        var item = findItem(Number(id));
        var qty = cart[id];
        total += item.price * qty;
        count += qty;

        html += '<div class="cart-row">';
        html += '  <span>' + item.name + '</span>';
        html += '  <span>';
        html += '    <button class="qty-btn" onclick="changeQty(' + item.id + ', -1)">-</button> ';
        html += qty;
        html += ' <button class="qty-btn" onclick="changeQty(' + item.id + ', 1)">+</button>';
        html += '  </span>';
        html += '  <span>&#8377;' + (item.price * qty) + '</span>';
        html += '</div>';
    }

    if (count === 0) {
        html = '<p class="empty">Your cart is empty. The food is not going to order itself.</p>';
    }

    box.innerHTML = html;
    document.getElementById("cart-total").textContent = total;
    document.getElementById("cart-count").textContent = count;
}

// ---------- CHECKOUT ----------
function openCheckout() {
    var total = 0;
    var html = "";

    for (var id in cart) {
        var item = findItem(Number(id));
        var qty = cart[id];
        total += item.price * qty;
        html += '<div class="cart-row"><span>' + item.name + ' x ' + qty + '</span><span>&#8377;' + (item.price * qty) + '</span></div>';
    }

    if (total === 0) {
        alert("Add something to your cart first.");
        return;
    }

    document.getElementById("summary-items").innerHTML = html;
    document.getElementById("summary-total").textContent = total;
    document.getElementById("checkout").classList.remove("hidden");
    document.getElementById("checkout").scrollIntoView();
}

function placeOrder() {
    var name = document.getElementById("cust-name").value.trim();
    var address = document.getElementById("cust-address").value.trim();
    var error = document.getElementById("checkout-error");

    if (name === "" || address === "") {
        error.textContent = "Please fill in your name and address.";
        return;
    }

    error.textContent = "";
    var orderNo = Math.floor(Math.random() * 9000) + 1000;
    var total = document.getElementById("summary-total").textContent;

    document.getElementById("confirm-text").textContent =
        "Thanks " + name + "! Order #" + orderNo + " of ₹" + total + " is on its way to " + address + ".";

    document.getElementById("checkout").classList.add("hidden");
    document.getElementById("confirmation").classList.remove("hidden");
    document.getElementById("confirmation").scrollIntoView();
}

function newOrder() {
    cart = {};
    showCart();
    document.getElementById("cust-name").value = "";
    document.getElementById("cust-address").value = "";
    document.getElementById("confirmation").classList.add("hidden");
    document.getElementById("menu").scrollIntoView();
}

// ---------- START ----------
showMenu();
showCart();