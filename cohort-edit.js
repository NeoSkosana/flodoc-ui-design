document.addEventListener('DOMContentLoaded', function() {
    // Update active navigation
    function updateActiveNav() {
        const navItems = document.querySelectorAll('.nav-item');
        const currentPage = window.location.pathname.split('/').pop() || 'cohort-edit.html';

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href && href.replace('.html', '') === 'cohorts') {
                item.classList.add('active');
            }
        });
    }

    // Initialize cohort edit page
    updateActiveNav();
    setupFormValidation();
    setupDocumentUpload();
    setupFormActions();
});

function setupFormValidation() {
    const form = document.getElementById('cohortForm');
    const requiredFields = form.querySelectorAll('[required]');

    // Date validation - end date must be after start date
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');

    if (startDate && endDate) {
        startDate.addEventListener('change', validateDates);
        endDate.addEventListener('change', validateDates);
    }

    // Real-time validation
    requiredFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });
}

function validateDates() {
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');

    if (startDate.value && endDate.value) {
        const start = new Date(startDate.value);
        const end = new Date(endDate.value);

        if (end <= start) {
            endDate.setCustomValidity('End date must be after start date');
            endDate.classList.add('error');
        } else {
            endDate.setCustomValidity('');
            endDate.classList.remove('error');
        }
    }
}

function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        field.classList.add('error');
        return false;
    } else {
        field.classList.remove('error');
        return true;
    }
}

function setupDocumentUpload() {
    const uploadArea = document.getElementById('documentUpload');
    const uploadBtn = uploadArea.querySelector('.upload-btn');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = '.pdf,.doc,.docx,.txt,.jpg,.png';

    let uploadedFiles = [];

    uploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
    });

    uploadArea.addEventListener('click', (e) => {
        if (e.target !== uploadBtn) {
            fileInput.click();
        }
    });

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-focus)';
        uploadArea.style.backgroundColor = 'var(--bg-primary)';
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-hover)';
        uploadArea.style.backgroundColor = 'transparent';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-hover)';
        uploadArea.style.backgroundColor = 'transparent';

        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    });

    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    });
}

function handleFiles(files) {
    const uploadedDocs = document.getElementById('uploadedDocuments');

    files.forEach(file => {
        // Validate file type and size
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
            return;
        }

        const documentItem = createDocumentItem(file);
        uploadedDocs.appendChild(documentItem);
    });
}

function createDocumentItem(file) {
    const documentItem = document.createElement('div');
    documentItem.className = 'document-item';

    const fileIcon = getFileIcon(file.type);
    const fileSize = formatFileSize(file.size);

    documentItem.innerHTML = `
        <div class="document-info">
            <div class="document-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    ${fileIcon}
                </svg>
            </div>
            <div class="document-details">
                <div class="document-name">${file.name}</div>
                <div class="document-size">${fileSize}</div>
            </div>
        </div>
        <button type="button" class="document-remove" onclick="removeDocument(this)">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </button>
    `;

    return documentItem;
}

function getFileIcon(fileType) {
    if (fileType.includes('pdf')) {
        return '<path d="M14 2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" stroke="currentColor" stroke-width="2"/><path d="M14 2v6h-6V2h6z" stroke="currentColor" stroke-width="2"/><text x="8" y="11" font-size="4" fill="currentColor">PDF</text>';
    } else if (fileType.includes('word') || fileType.includes('document')) {
        return '<path d="M14 2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" stroke="currentColor" stroke-width="2"/><path d="M8 6h4M8 10h4M8 8h4" stroke="currentColor" stroke-width="2"/>';
    } else if (fileType.includes('image')) {
        return '<path d="M14 2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="8" r="2" stroke="currentColor" stroke-width="2"/><path d="M6 14l2-2 2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    } else {
        return '<path d="M14 2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" stroke="currentColor" stroke-width="2"/><path d="M8 6h4M8 10h4M8 8h1" stroke="currentColor" stroke-width="2"/>';
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function removeDocument(button) {
    const documentItem = button.closest('.document-item');
    documentItem.remove();
}

function setupFormActions() {
    // These are already set up with onclick handlers in the HTML
}

function cancelForm() {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
        window.location.href = 'cohorts.html';
    }
}

function saveDraft() {
    if (validateForm()) {
        const formData = collectFormData();
        formData.status = 'draft';

        // In a real application, this would send data to the server
        console.log('Saving draft:', formData);
        alert('Cohort saved as draft successfully!');

        // Optionally redirect to cohorts page
        setTimeout(() => {
            window.location.href = 'cohorts.html';
        }, 1000);
    }
}

function publishCohort() {
    if (validateForm()) {
        const formData = collectFormData();
        formData.status = 'published';

        // Additional validation for publishing
        if (!confirm('Are you ready to publish this cohort? It will be visible to students and sponsors.')) {
            return;
        }

        // In a real application, this would send data to the server
        console.log('Publishing cohort:', formData);
        alert('Cohort published successfully!');

        // Redirect to cohorts page
        setTimeout(() => {
            window.location.href = 'cohorts.html';
        }, 1000);
    }
}

function validateForm() {
    const form = document.getElementById('cohortForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields before proceeding.');
        return false;
    }

    return true;
}

function collectFormData() {
    const form = document.getElementById('cohortForm');
    const formData = new FormData(form);
    const data = {};

    // Convert FormData to plain object
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    // Add document information
    const uploadedDocs = document.getElementById('uploadedDocuments');
    const documentItems = uploadedDocs.querySelectorAll('.document-item');
    data.documents = Array.from(documentItems).map(item => ({
        name: item.querySelector('.document-name').textContent,
        size: item.querySelector('.document-size').textContent
    }));

    return data;
}