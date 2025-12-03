// CART SYSTEM (connected with snacks + recipes)

// same CART_KEY used everywhere
const CART_KEY = "pufnut_cart_v3";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

// NAVBAR CART COUNT
function updateCartCount() {
  const total = readCart().reduce((n, i) => n + (i.qty || 1), 0);
  document.querySelectorAll(".nav-cart-count").forEach(el => {
    el.textContent = total;
  });
}

// RENDER CART
function renderCart() {
  const cart = readCart();
  const list = document.getElementById("cartList");
  const subtotalEl = document.getElementById("cartSubtotal");

  if (!list) return;

  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = `<p style="color:#fff; text-align:center; padding:25px;">Your cart is empty.</p>`;
    subtotalEl.innerText = "₹0.00";
    return;
  }

  let subtotal = 0;

  cart.forEach(item => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;

    subtotal += price * qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div class="cart-item-img" style="background-image:url('${item.img}');"></div>

      <div class="cart-item-content">
        <div class="cart-item-title">${item.name}</div>

        <div class="qty-box">
          <button class="qty-btn" data-id="${item.id}" data-action="minus">-</button>
          <span class="qty-num">${qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-action="plus">+</button>
        </div>

        <div class="cart-item-price">₹${(price * qty).toFixed(2)}</div>

        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;

    list.appendChild(div);
  });

  subtotalEl.innerText = `₹${subtotal.toFixed(2)}`;

  attachCartEvents();
}

// BUTTON EVENTS
function attachCartEvents() {
  document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;

      const cart = readCart();
      const item = cart.find(i => i.id === id);

      if (!item) return;

      if (action === "plus") item.qty++;
      if (action === "minus" && item.qty > 1) item.qty--;

      saveCart(cart);
      renderCart();
    });
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      let cart = readCart();
      cart = cart.filter(i => i.id !== id);
      saveCart(cart);
      renderCart();
    });
  });
}

// initial render
renderCart();
updateCartCount();
