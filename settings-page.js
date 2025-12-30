// Settings Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupSignatureCanvas();
    setupInitialsCanvas();
    setupFormHandlers();
    loadUserProfile();
    loadSavedSignatures();
});

function initializePage() {
    // Update active navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.textContent.includes('Settings')) {
            item.classList.add('active');
        }
    });
}

// Signature Canvas Functionality
function setupSignatureCanvas() {
    const canvas = document.getElementById('signatureCanvas');
    const placeholder = document.getElementById('signaturePlaceholder');
    const clearBtn = document.getElementById('clearSignatureBtn');
    const saveBtn = document.getElementById('saveSignatureBtn');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hasSignature = false;

    // Set canvas style
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Get mouse position relative to canvas
    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    // Start drawing
    function startDrawing(e) {
        isDrawing = true;
        const pos = getMousePos(canvas, e);
        lastX = pos.x;
        lastY = pos.y;

        // Hide placeholder when user starts drawing
        if (placeholder && !hasSignature) {
            placeholder.style.display = 'none';
        }
    }

    // Draw function
    function draw(e) {
        if (!isDrawing) return;

        const pos = getMousePos(canvas, e);

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        lastX = pos.x;
        lastY = pos.y;
        hasSignature = true;
    }

    // Stop drawing
    function stopDrawing() {
        isDrawing = false;
    }

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events for mobile
    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchend', function(e) {
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });

    // Clear signature
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hasSignature = false;
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
            console.log('Signature cleared');
        });
    }

    // Save signature
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            if (!hasSignature) {
                alert('Please draw your signature before saving.');
                return;
            }

            const signatureData = canvas.toDataURL();
            localStorage.setItem('userSignature', signatureData);
            console.log('Signature saved to localStorage');
            alert('Signature saved successfully!');
        });
    }

    // Store canvas context for later use
    canvas.signatureContext = ctx;
    canvas.hasSignature = function() { return hasSignature; };
}

// Initials Canvas Functionality
function setupInitialsCanvas() {
    const canvas = document.getElementById('initialsCanvas');
    const placeholder = document.getElementById('initialsPlaceholder');
    const clearBtn = document.getElementById('clearInitialsBtn');
    const saveBtn = document.getElementById('saveInitialsBtn');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hasInitials = false;

    // Set canvas style
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Get mouse position relative to canvas
    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    // Start drawing
    function startDrawing(e) {
        isDrawing = true;
        const pos = getMousePos(canvas, e);
        lastX = pos.x;
        lastY = pos.y;

        // Hide placeholder when user starts drawing
        if (placeholder && !hasInitials) {
            placeholder.style.display = 'none';
        }
    }

    // Draw function
    function draw(e) {
        if (!isDrawing) return;

        const pos = getMousePos(canvas, e);

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        lastX = pos.x;
        lastY = pos.y;
        hasInitials = true;
    }

    // Stop drawing
    function stopDrawing() {
        isDrawing = false;
    }

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events for mobile
    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchend', function(e) {
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });

    // Clear initials
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hasInitials = false;
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
            console.log('Initials cleared');
        });
    }

    // Save initials
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const initialsTextInput = document.getElementById('initialsText');
            const initialsText = initialsTextInput ? initialsTextInput.value.trim() : '';

            if (!hasInitials && !initialsText) {
                alert('Please enter or draw your initials before saving.');
                return;
            }

            // Save drawn initials if available
            if (hasInitials) {
                const initialsData = canvas.toDataURL();
                localStorage.setItem('userInitials', initialsData);
            }

            // Save text initials if available
            if (initialsText) {
                localStorage.setItem('userInitialsText', initialsText);
            }

            console.log('Initials saved to localStorage');
            alert('Initials saved successfully!');
        });
    }

    // Store canvas context for later use
    canvas.initialsContext = ctx;
    canvas.hasInitials = function() { return hasInitials; };
}

// Form Handlers
function setupFormHandlers() {
    const form = document.getElementById('settingsForm');
    const cancelBtn = document.getElementById('cancelBtn');

    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSaveProfile();
        });
    }

    // Cancel button
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            handleCancel();
        });
    }
}

// Load User Profile
function loadUserProfile() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@university.edu'
    };

    // Populate form fields
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const initialsTextInput = document.getElementById('initialsText');

    if (firstNameInput) firstNameInput.value = userProfile.firstName || '';
    if (lastNameInput) lastNameInput.value = userProfile.lastName || '';
    if (emailInput) emailInput.value = userProfile.email || '';
    if (initialsTextInput) initialsTextInput.value = localStorage.getItem('userInitialsText') || '';

    console.log('User profile loaded:', userProfile);
}

// Load Saved Signatures
function loadSavedSignatures() {
    const savedSignature = localStorage.getItem('userSignature');
    const savedInitials = localStorage.getItem('userInitials');

    if (savedSignature) {
        const signatureCanvas = document.getElementById('signatureCanvas');
        const ctx = signatureCanvas.getContext('2d');
        const img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            const placeholder = document.getElementById('signaturePlaceholder');
            if (placeholder) placeholder.style.display = 'none';
        };
        img.src = savedSignature;
    }

    if (savedInitials) {
        const initialsCanvas = document.getElementById('initialsCanvas');
        const ctx = initialsCanvas.getContext('2d');
        const img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            const placeholder = document.getElementById('initialsPlaceholder');
            if (placeholder) placeholder.style.display = 'none';
        };
        img.src = savedInitials;
    }
}

// Handle Save Profile
function handleSaveProfile() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();

    // Validate form
    if (!firstName || !lastName || !email) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Create profile object
    const profile = {
        firstName,
        lastName,
        email,
        updatedAt: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));

    console.log('Profile saved:', profile);
    alert('Profile updated successfully!');
}

// Handle Cancel
function handleCancel() {
    const confirmCancel = confirm('Are you sure you want to cancel? Any unsaved changes will be lost.');

    if (confirmCancel) {
        // Reload the page to reset the form
        location.reload();
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
