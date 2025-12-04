// checkout.js - fixed, robust single-page checkout + success animation + cart clear

function getCartKey() {
  const session = JSON.parse(localStorage.getItem('PUFNUT_USER_SESSION'));
  return session && session.email ? `pufnut_cart_${session.email}` : 'pufnut_cart_guest';
}

function readCart() {
  try { return JSON.parse(localStorage.getItem(getCartKey()) || "[]"); }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const total = readCart().reduce((s, i) => s + (Number(i.qty) || 1), 0);
  document.querySelectorAll(".nav-cart-count").forEach(el => { 
    el.textContent = total; 
    el.style.display = total > 0 ? 'inline-block' : 'none';
  });
}

// render checkout summary (keeps page accurate)
function renderCheckout() {
  const cart = readCart();
  const container = document.getElementById("checkoutItems");
  const totalEl = document.getElementById("checkoutTotal");

  if (!container || !totalEl) return;

  if (!cart || cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.innerText = "₹0.00";
    return;
  }

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    total += price * qty;

    const div = document.createElement("div");
    div.className = "summary-item";
    div.innerHTML = `<span>${item.name} (x${qty})</span><span>₹${(price * qty).toFixed(2)}</span>`;
    container.appendChild(div);
  });

  totalEl.innerText = `₹${total.toFixed(2)}`;
}

// helper: simple validation for phone (basic)
function isPhoneValid(phone) {
  if (!phone) return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10; // basic check
}

// Find DOM elements once (safe)
const placeBtn = document.getElementById("placeOrderBtn");
const successBox = document.getElementById("successBox");
const orderIdEl = document.getElementById("orderID");
const checkoutItemsContainer = document.getElementById("checkoutItems");
const checkoutTotalEl = document.getElementById("checkoutTotal");

// Ensure inputs exist
const inputName = document.getElementById("fullName");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");
const inputAddress = document.getElementById("address");
const inputPayment = document.getElementById("paymentMethod");

// Guard: if any element missing, do not break — just return gracefully
if (!placeBtn || !successBox || !orderIdEl) {
  console.warn("checkout.js: missing critical DOM elements. Aborting init.");
} else {

  // Place order handler
  placeBtn.addEventListener("click", () => {
    // read values safely
    const name = inputName ? inputName.value.trim() : "";
    const email = inputEmail ? inputEmail.value.trim() : "";
    const phone = inputPhone ? inputPhone.value.trim() : "";
    const address = inputAddress ? inputAddress.value.trim() : "";
    const payment = inputPayment ? inputPayment.value : "COD";

    // basic validation
    if (!name || !phone || !address) {
      alert("Please fill required fields: Name, Phone and Address.");
      return;
    }
    if (!isPhoneValid(phone)) {
      alert("Please enter a valid phone number (at least 10 digits).");
      return;
    }

    // Disable button to prevent double clicks
    placeBtn.disabled = true;
    placeBtn.style.opacity = "0.7";

    // Button micro animation (if GSAP exists)
    if (window.gsap) {
      gsap.to(placeBtn, { scale: 0.95, duration: 0.08, yoyo: true, repeat: 1 });
    }

    // Show small feedback (optional): change button text briefly
    const previousText = placeBtn.innerText;
    placeBtn.innerText = "Placing order...";

    // Simulate processing delay then show success
    setTimeout(() => {
      // generate order id
      const id = "PUF" + Math.floor(100000 + Math.random() * 900000);
      orderIdEl.innerText = `#${id}`;

      // build expected delivery date (current + 4 to 6 days)
      const now = new Date();
      const min = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
      const max = new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000);
      const opts = { month: "short", day: "numeric" };
      const deliveryText = `${min.toLocaleDateString(undefined, opts)} - ${max.toLocaleDateString(undefined, opts)}`;

      // show delivery in box (if element exists)
      const deliveryEl = successBox.querySelector("p:nth-of-type(2)");
      if (deliveryEl) {
        deliveryEl.innerHTML = `Expected Delivery: <strong>${deliveryText}</strong>`;
      }

      // show success box animated
      successBox.classList.remove("hidden");
      successBox.style.display = "block";

      if (window.gsap) {
        gsap.fromTo(successBox, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.55, ease: "power3.out" });
      }

      // Clear cart
      localStorage.setItem(CART_KEY, "[]");
      updateCartCount();

      // reset button
      placeBtn.innerText = previousText;
      placeBtn.disabled = false;
      placeBtn.style.opacity = "";

      // Clear checkout items UI and totals
      if (checkoutItemsContainer) checkoutItemsContainer.innerHTML = "<p>Your order is confirmed.</p>";
      if (checkoutTotalEl) checkoutTotalEl.innerText = "₹0.00";

      // Optional: scroll to success box smoothly
      try { successBox.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) {}

    }, 550); // small delay for animation feel
  });
}

// Init
renderCheckout();
updateCartCount();
