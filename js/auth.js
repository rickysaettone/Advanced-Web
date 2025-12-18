document.addEventListener('DOMContentLoaded', () => {
    // 1. Inyectar el HTML del Modal (Ahora con dos formularios: Login y Registro)
    const modalHTML = `
    <div id="authModal" class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            
            <div id="loginContainer">
                <h2>Welcome Back!</h2>
                <form id="loginForm">
                    <input type="text" id="loginUser" placeholder="Username" required>
                    <input type="password" id="loginPass" placeholder="Password" required>
                    <button type="submit">Log In</button>
                    <p class="error-msg" id="loginError"></p>
                </form>
                <p class="auth-switch">
                    New here? <a id="showRegister">Create an account</a>
                </p>
            </div>

            <div id="registerContainer" style="display:none;">
                <h2>Create Account</h2>
                <form id="registerForm">
                    <input type="text" id="regUser" placeholder="Choose a Username" required>
                    <input type="password" id="regPass" placeholder="Choose a Password" required>
                    <button type="submit" style="background-color: #d4192f;">Sign Up</button>
                    <p class="error-msg" id="regError"></p>
                </form>
                <p class="auth-switch">
                    Already have an account? <a id="showLogin">Log in here</a>
                </p>
            </div>
        </div>
    </div>`;
    
    // Evitar duplicar el modal si el script se carga dos veces
    if (!document.getElementById('authModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // 2. Referencias a elementos
    const loginLink = document.querySelector('.login a');
    const modal = document.getElementById('authModal');
    const closeBtn = document.querySelector('.close-btn');
    
    // Contenedores y Forms
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Links para cambiar entre Login/Registro
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');

    // Errores
    const loginError = document.getElementById('loginError');
    const regError = document.getElementById('regError');

    // 3. Verificar estado inicial
    checkLoginStatus();

    // 4. Lógica de Apertura/Cierre del Modal
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            const currentUser = localStorage.getItem('currentUser');
            
            if (currentUser) {
                // LOGOUT logic
                if(confirm(`Do you want to log out, ${currentUser}?`)) {
                    logout();
                }
            } else {
                // Abrir Modal (resetear vista a Login siempre)
                showLoginForm();
                modal.style.display = 'block';
                loginError.style.display = 'none';
                regError.style.display = 'none';
                loginForm.reset();
                registerForm.reset();
            }
        });
    }

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target == modal) modal.style.display = 'none';
    });

    // 5. Cambiar entre Login y Registro
    showRegisterBtn.addEventListener('click', () => {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
        regError.style.display = 'none'; // Limpiar errores previos
    });

    showLoginBtn.addEventListener('click', showLoginForm);

    function showLoginForm() {
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
        loginError.style.display = 'none';
    }

    // 6. Lógica de REGISTRO (Sign Up)
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('regUser').value.trim();
        const pass = document.getElementById('regPass').value.trim();

        // Obtener usuarios existentes
        const usersDB = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // Verificar si ya existe
        const exists = usersDB.find(u => u.username === user);
        if (exists) {
            regError.textContent = "⚠️ This username is already taken.";
            regError.style.display = 'block';
            return;
        }

        // Guardar nuevo usuario
        usersDB.push({ username: user, password: pass });
        localStorage.setItem('registeredUsers', JSON.stringify(usersDB));

        alert('Account created successfully! Please log in.');
        showLoginForm(); // Volver al login para que entre
    });

    // 7. Lógica de LOGIN
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('loginUser').value.trim();
        const pass = document.getElementById('loginPass').value.trim();

        const usersDB = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // Buscar usuario que coincida nombre Y contraseña
        const validUser = usersDB.find(u => u.username === user && u.password === pass);

        if (validUser) {
            // Login exitoso
            localStorage.setItem('currentUser', validUser.username);
            modal.style.display = 'none';
            checkLoginStatus();
            // Recargar la página para que se desbloqueen los comentarios
            location.reload(); 
        } else {
            // Error
            loginError.textContent = "❌ Invalid username or password.";
            loginError.style.display = 'block';
        }
    });

    // Funciones auxiliares
    function checkLoginStatus() {
        const user = localStorage.getItem('currentUser');
        if (user && loginLink) {
            loginLink.textContent = `👤 ${user} (Logout)`;
            loginLink.style.color = '#f39536a'; 
            loginLink.style.fontWeight = 'bold';
        } else if (loginLink) {
            loginLink.textContent = 'Log in';
            loginLink.style.color = '';
            loginLink.style.fontWeight = 'normal';
        }
    }

    function logout() {
        localStorage.removeItem('currentUser');
        checkLoginStatus();
        alert('You have logged out.');
        location.reload(); 
    }
});