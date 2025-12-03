// js/admin-auth.js  (REPLACE file)
// ADMIN LOGIN SYSTEM (location-aware)

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "pufnut123";
const ADMIN_SESSION = "PUFNUT_ADMIN_SESSION";

function isInPagesFolder() {
  return window.location.pathname.toLowerCase().includes("/pages/");
}

(function initAdminLogin(){
  const btn = document.getElementById("adminLoginBtn");
  if(!btn) return;

  btn.addEventListener("click", () => {
    const userEl = document.getElementById("adminUser");
    const passEl = document.getElementById("adminPass");
    if(!userEl || !passEl) {
      alert("Admin login inputs missing (check IDs).");
      return;
    }
    const user = userEl.value.trim();
    const pass = passEl.value.trim();
    if(user === ADMIN_USERNAME && pass === ADMIN_PASSWORD){
      localStorage.setItem(ADMIN_SESSION, "LOGGED_IN");
      alert("Admin Access Granted!");
      // admin.html path depends on location
      const prefix = isInPagesFolder() ? "" : "Pages/";
      window.location.href = prefix + "admin.html";
    } else {
      alert("Invalid Admin Credentials!");
    }
  });
})();

// Protect admin.html (if user tries to open it directly)
(function protectAdminPage(){
  const path = window.location.pathname.toLowerCase();
  if(path.endsWith("/admin.html") || path.includes("/admin.html")) {
    const session = localStorage.getItem(ADMIN_SESSION);
    if(!session) {
      alert("Admin login required!");
      const prefix = isInPagesFolder() ? "" : "Pages/"; // if admin-login is in Pages or root
      window.location.href = prefix + "admin-login.html";
    }
  }
})();
