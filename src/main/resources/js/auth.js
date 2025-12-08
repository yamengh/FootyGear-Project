// Authentication JavaScript
const API_BASE = window.location.origin + '/api/auth';

// Check which page we're on
const isLoginPage = window.location.pathname.includes('login.html');
const isSignupPage = window.location.pathname.includes('signup.html');

// Helper functions
function showError(message) {
    const errorEl = document.getElementById('error-message');
    const successEl = document.getElementById('success-message');

    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
        successEl.classList.remove('show');

        setTimeout(() => errorEl.classList.remove('show'), 5000);
    }
}

function showSuccess(message) {
    const errorEl = document.getElementById('error-message');
    const successEl = document.getElementById('success-message');

    if (successEl) {
        successEl.textContent = message;
        successEl.classList.add('show');
        errorEl.classList.remove('show');
    }
}

function setLoading(button, isLoading) {
    if (!button) return;

    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner"></span>Processing...';
    } else {
        button.disabled = false;
        button.innerHTML = isLoginPage ? 'Login' : 'Create Account';
    }
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;

    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    return strength;
}

function updatePasswordStrength() {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('password-strength-bar');
    const strengthText = document.getElementById('password-strength-text');
    const strengthContainer = document.getElementById('password-strength');

    if (!passwordInput || !strengthBar) return;

    const password = passwordInput.value;

    if (password.length === 0) {
        strengthContainer.classList.remove('visible');
        return;
    }

    strengthContainer.classList.add('visible');
    const strength = checkPasswordStrength(password);

    // Remove all classes
    strengthBar.classList.remove('weak', 'medium', 'strong');

    if (strength <= 2) {
        strengthBar.classList.add('weak');
        strengthText.textContent = 'Weak password';
        strengthText.style.color = '#ff6b6b';
    } else if (strength <= 3) {
        strengthBar.classList.add('medium');
        strengthText.textContent = 'Medium password';
        strengthText.style.color = '#ffd43b';
    } else {
        strengthBar.classList.add('strong');
        strengthText.textContent = 'Strong password';
        strengthText.style.color = '#51cf66';
    }
}

// Login form handler
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const submitBtn = document.getElementById('submit-btn');

    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }

    setLoading(submitBtn, true);

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            showSuccess(data.message);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showError(data.message || 'Login failed');
            setLoading(submitBtn, false);
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('Network error. Please try again.');
        setLoading(submitBtn, false);
    }
}

// Signup form handler
async function handleSignup(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const terms = document.getElementById('terms').checked;
    const submitBtn = document.getElementById('submit-btn');

    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }

    if (name.length < 2) {
        showError('Name must be at least 2 characters long');
        return;
    }

    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }

    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }

    if (!terms) {
        showError('Please accept the terms and conditions');
        return;
    }

    setLoading(submitBtn, true);

    try {
        const response = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (data.success) {
            showSuccess(data.message);
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            showError(data.message || 'Signup failed');
            setLoading(submitBtn, false);
        }
    } catch (error) {
        console.error('Signup error:', error);
        showError('Network error. Please try again.');
        setLoading(submitBtn, false);
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    if (isLoginPage) {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
    }

    if (isSignupPage) {
        const signupForm = document.getElementById('signup-form');
        const passwordInput = document.getElementById('password');

        if (signupForm) {
            signupForm.addEventListener('submit', handleSignup);
        }

        if (passwordInput) {
            passwordInput.addEventListener('input', updatePasswordStrength);
        }
    }
});
