/**
 * Stackly Smart Living - Auth Interface Logic
 * Tab Switching, Role Synchronization, Password Toggle & Redirection
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initial setup if needed
});

// Switch between Login and Signup tabs
function switchAuthTab(tab) {
    const loginTabBtn = document.getElementById('tabLoginBtn');
    const signupTabBtn = document.getElementById('tabSignupBtn');
    const loginView = document.getElementById('loginView');
    const signupView = document.getElementById('signupView');

    if (tab === 'login') {
        loginTabBtn.classList.add('active');
        signupTabBtn.classList.remove('active');
        
        signupView.classList.remove('active');
        setTimeout(() => {
            loginView.classList.add('active');
        }, 50);
    } else {
        signupTabBtn.classList.add('active');
        loginTabBtn.classList.remove('active');
        
        loginView.classList.remove('active');
        setTimeout(() => {
            signupView.classList.add('active');
        }, 50);
    }
}

// Toggle password visibility with icon update
function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        icon.style.color = 'var(--auth-accent, #D4E668)';
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        icon.style.color = '';
    }
}

// Show Toast Notification
let toastTimeout;
function triggerAuthToast(title, message, isSuccess = true) {
    const toast = document.getElementById('authFloatingToast');
    const toastTitle = document.getElementById('toastTitleText');
    const toastMsg = document.getElementById('toastMsgText');
    const toastIcon = document.getElementById('toastIconElem');

    if (!toast) return;

    clearTimeout(toastTimeout);

    toastTitle.textContent = title;
    toastMsg.textContent = message;

    if (isSuccess) {
        toastIcon.className = 'fas fa-check-circle';
        toast.style.borderColor = 'var(--auth-accent, #D4E668)';
    } else {
        toastIcon.className = 'fas fa-exclamation-triangle';
        toast.style.borderColor = '#FF5C5C';
    }

    toast.classList.add('visible');

    toastTimeout = setTimeout(() => {
        toast.classList.remove('visible');
    }, 4500);
}

// Handle Signup Form Submission
function handleSignupSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById('signupName');
    const emailInput = document.getElementById('signupEmail');
    const roleRadio = document.querySelector('input[name="signupRole"]:checked');
    const selectedRole = roleRadio ? roleRadio.value : 'User';

    const userName = nameInput.value.trim();
    const userEmail = emailInput.value.trim();

    // Store user info map
    try {
        const savedUsers = JSON.parse(localStorage.getItem('smartHomeUsers') || '{}');
        savedUsers[userEmail.toLowerCase()] = { name: userName, role: selectedRole };
        localStorage.setItem('smartHomeUsers', JSON.stringify(savedUsers));
    } catch (err) {
        console.warn('LocalStorage unavailable:', err);
    }

    // Pre-fill Login Credentials
    const loginEmailInput = document.getElementById('loginEmail');
    if (loginEmailInput) loginEmailInput.value = userEmail;

    const matchedLoginRole = document.querySelector(`input[name="loginRole"][value="${selectedRole}"]`);
    if (matchedLoginRole) matchedLoginRole.checked = true;

    // Directly transition to Sign In section immediately
    switchAuthTab('login');
    const loginPasswordInput = document.getElementById('loginPassword');
    if (loginPasswordInput) {
        loginPasswordInput.focus();
    }
}

// Handle Login Form Submission
function handleLoginSubmit(e) {
    e.preventDefault();
    const emailInput = document.getElementById('loginEmail');
    const email = emailInput ? emailInput.value.trim() : '';
    const roleRadio = document.querySelector('input[name="loginRole"]:checked');
    const selectedRole = roleRadio ? roleRadio.value : 'User';

    const targetDashboard = (selectedRole.toLowerCase() === 'admin') ? 'admindashboard.html' : 'userdashboard.html';

    // Retrieve name if previously registered or format from email
    let displayName = '';
    try {
        const savedUsers = JSON.parse(localStorage.getItem('smartHomeUsers') || '{}');
        if (savedUsers[email.toLowerCase()] && savedUsers[email.toLowerCase()].name) {
            displayName = savedUsers[email.toLowerCase()].name;
        }
    } catch (err) {
        console.warn('LocalStorage read error:', err);
    }

    if (!displayName && email) {
        const prefix = email.split('@')[0];
        displayName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }

    // Save session state to localStorage
    try {
        localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            name: displayName || email,
            role: selectedRole,
            loginTime: new Date().toISOString()
        }));
    } catch (err) {
        console.warn('LocalStorage unavailable:', err);
    }

    // Direct immediate redirect to dashboard (no popup delay)
    window.location.href = targetDashboard;
}
