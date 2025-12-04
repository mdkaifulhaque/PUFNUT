// js/auth.js
const ALL_USERS_KEY = 'pufnut_users';
const SESSION_KEY = 'PUFNUT_USER_SESSION';

// --- SIGNUP ---
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();

        if (!name || !email || !password) {
            alert('Please fill all fields.');
            return;
        }

        let users = JSON.parse(localStorage.getItem(ALL_USERS_KEY) || '[]');
        if (users.some(user => user.email === email)) {
            alert('An account with this email already exists.');
            return;
        }

        const newUser = {
            name,
            email,
            password, // In a real app, this should be hashed!
            profileImg: 'https://via.placeholder.com/150', // Default profile image
            mobile: '',
            address: ''
        };
        users.push(newUser);
        localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));

        // Create a session for the new user
        const sessionData = {
            email: newUser.email,
            name: newUser.name,
            profileImg: newUser.profileImg
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));

        alert('Signup successful! Redirecting you...');
        window.location.href = '../index.html';
    });
}

// --- LOGIN ---
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        const users = JSON.parse(localStorage.getItem(ALL_USERS_KEY) || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const sessionData = {
                email: user.email,
                name: user.name,
                profileImg: user.profileImg
            };
            localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
            alert('Login successful!');
            window.location.href = '../index.html';
        } else {
            alert('Invalid email or password.');
        }
    });
}


// ---------------- LOGOUT
function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
  location.reload();
}
