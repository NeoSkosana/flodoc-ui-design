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

    // Form validation
    const form = document.querySelector('.registration-form');
    const submitBtn = document.querySelector('.submit-btn');

    if (form && submitBtn) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            const firstName = document.getElementById('first-name').value.trim();
            const lastName = document.getElementById('last-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const agreeTerms = document.getElementById('agree-terms').checked;

            // Reset any previous error states
            clearErrors();

            let hasError = false;

            // Validate first name
            if (!firstName) {
                showError('first-name', 'First name is required');
                hasError = true;
            }

            // Validate last name
            if (!lastName) {
                showError('last-name', 'Last name is required');
                hasError = true;
            }

            // Validate email
            if (!email) {
                showError('email', 'Email is required');
                hasError = true;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                hasError = true;
            }

            // Validate password
            if (!password) {
                showError('password', 'Password is required');
                hasError = true;
            } else if (password.length < 8) {
                showError('password', 'Password must be at least 8 characters long');
                hasError = true;
            }

            // Validate terms agreement
            if (!agreeTerms) {
                showError('agree-terms', 'You must agree to the Terms of Service and Privacy Policy');
                hasError = true;
            }

            if (!hasError) {
                // Simulate form submission
                submitBtn.textContent = 'Creating account...';
                submitBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    alert('Account created successfully! (This is a demo)');
                    submitBtn.textContent = 'Create account';
                    submitBtn.disabled = false;
                    form.reset();
                }, 2000);
            }
        });
    }

    // Social sign-up handlers
    const googleBtn = document.querySelector('.google-btn');
    const microsoftBtn = document.querySelector('.microsoft-btn');

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

    // Sign in button handler
    const signInBtn = document.querySelector('.sign-in-btn');
    if (signInBtn) {
        signInBtn.addEventListener('click', function() {
            alert('Sign in page would be implemented here');
        });
    }
});

// Helper functions
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());

    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.style.borderColor = '#d1d5db';
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

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}