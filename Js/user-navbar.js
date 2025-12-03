// Js/user-navbar.js

document.addEventListener('DOMContentLoaded', () => {
    const navPart3 = document.getElementById('nav-part3');
    if (!navPart3) return;

    // Determine the correct path prefix
    const isPages = window.location.pathname.includes('/Pages/');
    const prefix = isPages ? '' : 'Pages/';

    // Basic Navbar Structure (Cart + Login)
    // The Profile script will override this if the user is logged in.
    navPart3.innerHTML = `
        <a href="${prefix}cart.html" style="text-decoration:none;">
            <h3>Cart <span class="nav-cart-count" style="font-size:0.8em; background:#f5cb5c; color:black; border-radius:50%; padding:2px 6px; display:none;">0</span></h3>
        </a>
        <a href="${prefix}login.html" class="nav-login-link" style="text-decoration:none;">
            <h3>Login</h3>
        </a>
    `;
    
    // Update cart count
    const cart = JSON.parse(localStorage.getItem('pufnut_cart_v3') || '[]');
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const countEl = document.querySelector('.nav-cart-count');
    if(countEl && count > 0) {
        countEl.textContent = count;
        countEl.style.display = 'inline-block';
    }
});
