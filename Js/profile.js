// Js/profile.js

document.addEventListener('DOMContentLoaded', () => {
    const USERS_KEY = 'pufnut_users';
    const SESS_KEY = 'PUFNUT_USER_SESSION';

    function getSession() {
        return JSON.parse(localStorage.getItem(SESS_KEY));
    }

    function getUsers() {
        return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    }

    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function updateSession(data) {
        localStorage.setItem(SESS_KEY, JSON.stringify(data));
    }

    function clearSession() {
        localStorage.removeItem(SESS_KEY);
    }

    // 1. Check Auth
    const session = getSession();
    if (!session) {
        // Not logged in, redirect to login
        window.location.href = 'login.html';
        return;
    }

    // 2. Load Data
    const users = getUsers();
    const currentUser = users.find(u => u.email === session.email);

    if (currentUser) {
        // Populate Header
        document.getElementById('profileImg').src = currentUser.profileImg || 'https://via.placeholder.com/150';
        document.getElementById('profileName').textContent = currentUser.name;
        document.getElementById('profileEmail').textContent = currentUser.email;

        // Populate Form
        document.getElementById('pName').value = currentUser.name;
        document.getElementById('pMobile').value = currentUser.mobile || '';
        document.getElementById('pAddress').value = currentUser.address || '';
        document.getElementById('pImgUrl').value = currentUser.profileImg || '';
    }

    // 3. Handle Save
    const form = document.getElementById('profileForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('pName').value;
            const mobile = document.getElementById('pMobile').value;
            const address = document.getElementById('pAddress').value;
            const imgUrl = document.getElementById('pImgUrl').value;

            if (!name) {
                alert('Name is required');
                return;
            }

            // Update in Users Array
            const userIndex = users.findIndex(u => u.email === session.email);
            if (userIndex !== -1) {
                users[userIndex].name = name;
                users[userIndex].mobile = mobile;
                users[userIndex].address = address;
                if (imgUrl) users[userIndex].profileImg = imgUrl;

                saveUsers(users);

                // Update Session
                session.name = name;
                if (imgUrl) session.profileImg = imgUrl;
                updateSession(session);

                // Update UI
                document.getElementById('profileName').textContent = name;
                if (imgUrl) document.getElementById('profileImg').src = imgUrl;

                alert('Profile updated successfully!');
                
                // Refresh to update navbar image if changed
                window.location.reload();
            }
        });
    }

    // 4. Handle Logout
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                clearSession();
                window.location.href = '../index.html';
            }
        });
    }
});
