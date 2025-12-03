document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.eye-icon');

    if (passwordToggle && passwordInput && eyeIcon) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;

            // Update eye icon based on password visibility
            if (type === 'text') {
                eyeIcon.innerHTML = `
                    <path d="M1.66699 9.99984C1.66699 9.99984 5.00033 4.1665 10.0003 4.1665C15.0003 4.1665 18.3337 9.99984 18.3337 9.99984C18.3337 9.99984 15.0003 15.8332 10.0003 15.8332C5.00033 15.8332 1.66699 9.99984 1.66699 9.99984Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.66699 2.5L18.3337 17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                `;
            } else {
                eyeIcon.innerHTML = `
                    <path d="M1.66699 9.99984C1.66699 9.99984 5.00033 4.1665 10.0003 4.1665C15.0003 4.1665 18.3337 9.99984 18.3337 9.99984C18.3337 9.99984 15.0003 15.8332 10.0003 15.8332C5.00033 15.8332 1.66699 9.99984 1.66699 9.99984Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                `;
            }
        });
    }

    // Form submission
    const form = document.getElementById('signin-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear any previous errors
            clearErrors();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            let hasError = false;

            // Validate email
            if (!email) {
                showError('email', 'Email or phone is required');
                hasError = true;
            }

            // Validate password
            if (!password) {
                showError('password', 'Password is required');
                hasError = true;
            }

            if (!hasError) {
                // Simulate sign-in process
                const submitBtn = form.querySelector('.submit-btn');
                submitBtn.textContent = 'Signing in...';
                submitBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    alert('Sign in successful! (This is a demo)');
                    submitBtn.textContent = 'Sign in';
                    submitBtn.disabled = false;
                    form.reset();

                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                }, 2000);
            }
        });
    }

    // Social sign-in handlers
    const googleBtn = document.querySelector('.social-btn');
    const microsoftBtn = document.querySelectorAll('.social-btn')[1];

    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            alert('Google sign-in would be implemented here');
        });
    }

    if (microsoftBtn) {
        microsoftBtn.addEventListener('click', function() {
            alert('Microsoft sign-in would be implemented here');
        });
    }

    // Forgot password handler
    window.handleForgotPassword = function(event) {
        event.preventDefault();
        alert('Password reset would be implemented here');
    }

    // Helper functions
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());

        const inputs = document.querySelectorAll('.form-group input');
        inputs.forEach(input => {
            input.style.borderColor = 'var(--border-primary)';
        });
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '#ef4444';

            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#ef4444';
            errorDiv.style.fontSize = '14px';
            errorDiv.style.marginTop = '4px';
            errorDiv.textContent = message;

            field.parentNode.appendChild(errorDiv);
        }
    }
});

// Update register page navigation
document.addEventListener('DOMContentLoaded', function() {
    const registerLink = document.querySelector('a[href="register.html"]');
    if (registerLink && window.location.pathname.endsWith('register.html')) {
        registerLink.style.display = 'none';
    }
});