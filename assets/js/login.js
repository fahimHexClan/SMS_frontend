// Role selection
const roleBtns = document.querySelectorAll('.role-btn');
let selectedRole = 'student';

roleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        roleBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        selectedRole = this.dataset.role;

        // Update placeholder based on role
        const usernameInput = document.getElementById('username');
        if (selectedRole === 'student') {
            usernameInput.placeholder = 'Enter your email or Student ID';
        } else if (selectedRole === 'teacher') {
            usernameInput.placeholder = 'Enter your email or Teacher ID';
        } else {
            usernameInput.placeholder = 'Enter your admin email';
        }
    });

    // make role-btn keyboard accessible (Enter/Space)
    btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Password toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Form submission
const loginForm = document.getElementById('loginForm');
const errorAlert = document.getElementById('errorAlert');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;

    // Hide previous errors
    errorAlert.classList.remove('show');
    errorAlert.setAttribute('aria-hidden', 'true');

    // Add loading state
    const loginBtn = document.querySelector('.btn-login');
    loginBtn.classList.add('loading');
    loginBtn.setAttribute('disabled', 'true');

    // Simulate API call
    setTimeout(() => {
        loginBtn.classList.remove('loading');
        loginBtn.removeAttribute('disabled');

        // Demo validation
        if (username && password) {
            // Success - redirect to dashboard (demo)
            if (selectedRole === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else if (selectedRole === 'teacher') {
                window.location.href = 'teacher-dashboard.html';
            } else {
                window.location.href = 'student-dashboard.html';
            }
        } else {
            // Show error
            errorMessage.textContent = 'Please fill in all fields';
            errorAlert.classList.add('show');
            errorAlert.setAttribute('aria-hidden', 'false');
        }
    }, 1200);
});

// Hide error on input
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', function() {
        errorAlert.classList.remove('show');
        errorAlert.setAttribute('aria-hidden', 'true');
    });
});

// Social login buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // placeholder action
        alert('Social login functionality will be implemented soon!');
    });
});

// Register link
document.querySelector('.register-link a').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Register functionality will be implemented soon!');
});

// Back home
document.querySelector('.back-home').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'index.html';
});