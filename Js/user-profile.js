// Js/user-profile.js

(function() {
    const SESS_KEY = 'PUFNUT_USER_SESSION';

    function getSession() {
        return JSON.parse(localStorage.getItem(SESS_KEY));
    }

    function logoutUser() {
        if(confirm('Are you sure you want to logout?')) {
            localStorage.removeItem(SESS_KEY);
            window.location.reload();
        }
    }
    // Expose logout to window for onclick events if needed
    window.logoutUser = logoutUser;

    function initProfileFeature() {
        const session = getSession();
        if (!session) return; // No user logged in

        // Determine path to profile page
        const isPages = window.location.pathname.includes('/Pages/');
        const profilePath = isPages ? 'profile.html' : 'Pages/profile.html';

        // 1. Update Main Navbar (nav-part3)
        const navPart3 = document.getElementById('nav-part3');
        if (navPart3) {
            // Remove Login link
            const loginLink = navPart3.querySelector('.nav-login-link') || navPart3.querySelector('a[href*="login.html"]');
            if (loginLink) loginLink.remove();

            // Add User Image
            const userContainer = document.createElement('div');
            userContainer.className = 'nav-user-container';
            userContainer.style.display = 'flex';
            userContainer.style.alignItems = 'center';
            userContainer.style.gap = '10px';
            userContainer.style.cursor = 'pointer';
            userContainer.style.position = 'relative';
            userContainer.style.zIndex = '999';
            userContainer.style.marginTop = '-5px'; // Lift up slightly
            
            userContainer.innerHTML = `
                <a href="${profilePath}" style="display:flex; align-items:center;">
                    <img src="${session.profileImg || 'https://via.placeholder.com/150'}" alt="User" class="nav-user-img" style="width:40px; height:40px; border-radius:50%; object-fit:cover; border:2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                </a>
            `;
            
            navPart3.appendChild(userContainer);
        }

        // 2. Update Responsive Menu (aside)
        const asideNavUl = document.querySelector('aside nav ul');
        if (asideNavUl) {
            // Remove Login link
            const links = asideNavUl.querySelectorAll('li');
            links.forEach(li => {
                if (li.innerText.toLowerCase().includes('login')) {
                    li.remove();
                }
            });

            // Add Profile and Logout links
            const profileLi = document.createElement('li');
            profileLi.innerHTML = `<div class="mask"><a href="${profilePath}">Profile</a></div>`;
            asideNavUl.appendChild(profileLi);

            const logoutLi = document.createElement('li');
            logoutLi.innerHTML = `<div class="mask"><a href="#" id="mobileLogoutLink">Logout</a></div>`;
            asideNavUl.appendChild(logoutLi);

            setTimeout(() => {
                const lLink = document.getElementById('mobileLogoutLink');
                if(lLink) lLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    logoutUser();
                });
            }, 100);
        }
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        // Small delay to ensure user-navbar.js has finished building the basic nav
        setTimeout(initProfileFeature, 50); 
    });

})();
