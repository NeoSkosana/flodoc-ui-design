// Submission Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    loadStudentInfo();
    setupTabs();
    setupActionButtons();
    setupDocumentBrowser();
    setupRejectionModal();
});

// Load student information from sessionStorage
function loadStudentInfo() {
    const studentName = sessionStorage.getItem('currentStudent');
    const studentStatus = sessionStorage.getItem('currentStatus');

    if (studentName) {
        const studentNameElement = document.querySelector('.student-name');
        if (studentNameElement) {
            studentNameElement.textContent = studentName;
        }
    }

    if (studentStatus) {
        const statusBadge = document.querySelector('.status-badge');
        if (statusBadge) {
            statusBadge.textContent = studentStatus;

            // Update badge class based on status
            statusBadge.classList.remove('pending', 'waiting', 'in-progress', 'approved', 'rejected');

            const statusLower = studentStatus.toLowerCase().trim();
            if (statusLower === 'pending') {
                statusBadge.classList.add('pending');
            } else if (statusLower === 'waiting') {
                statusBadge.classList.add('waiting');
            } else if (statusLower === 'in progress') {
                statusBadge.classList.add('in-progress');
            } else if (statusLower === 'approved') {
                statusBadge.classList.add('approved');
            } else if (statusLower === 'rejected') {
                statusBadge.classList.add('rejected');
            }
        }
    }

    console.log(`Loaded submission page for student: ${studentName}, status: ${studentStatus}`);
}

// Tab Switching Functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Remove active class from all tab buttons
    const allTabButtons = document.querySelectorAll('.tab-button');
    allTabButtons.forEach(button => button.classList.remove('active'));

    // Remove active class from all tab panes
    const allTabPanes = document.querySelectorAll('.tab-pane');
    allTabPanes.forEach(pane => pane.classList.remove('active'));

    // Add active class to clicked tab button
    const activeTabButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
    if (activeTabButton) {
        activeTabButton.classList.add('active');
    }

    // Show corresponding tab content
    const activeTabPane = document.getElementById(`${tabName}-tab`);
    if (activeTabPane) {
        activeTabPane.classList.add('active');
    }

    console.log(`Switched to ${tabName} tab`);
}

// Action Buttons Functionality
function setupActionButtons() {
    const approveBtn = document.querySelector('.approve-btn');
    const rejectBtn = document.querySelector('.reject-btn');

    if (approveBtn) {
        approveBtn.addEventListener('click', function() {
            handleApprove();
        });
    }

    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            handleReject();
        });
    }
}

function handleApprove() {
    const studentName = document.querySelector('.student-name').textContent;
    console.log(`Approving submission for: ${studentName}`);

    // TODO: Implement approve logic
    // This would typically make an API call to update the submission status

    // For now, just update the UI to show approved state
    const statusBadge = document.querySelector('.status-badge');
    if (statusBadge) {
        statusBadge.textContent = 'Approved';
        statusBadge.classList.remove('pending');
        statusBadge.classList.add('approved');
    }

    // Show notification or redirect
    alert(`Submission for ${studentName} has been approved.`);
}

function handleReject() {
    const studentName = document.querySelector('.student-name').textContent;
    console.log(`Opening rejection modal for: ${studentName}`);

    // Show the rejection modal
    showRejectionModal();
}

// Rejection Modal Functions
function showRejectionModal() {
    const modal = document.getElementById('rejectionModal');
    if (modal) {
        modal.classList.add('active');
        console.log('Rejection modal opened');

        // Clear any previous reason
        const textarea = document.getElementById('rejectionReason');
        if (textarea) {
            textarea.value = '';
            textarea.focus();
        }
    }
}

function hideRejectionModal() {
    const modal = document.getElementById('rejectionModal');
    if (modal) {
        modal.classList.remove('active');
        console.log('Rejection modal closed');
    }
}

function confirmRejection() {
    const studentName = document.querySelector('.student-name').textContent;
    const textarea = document.getElementById('rejectionReason');
    const rejectionReason = textarea ? textarea.value.trim() : '';

    if (!rejectionReason) {
        alert('Please provide a reason for rejection.');
        return;
    }

    console.log(`Confirming rejection for: ${studentName}`);
    console.log(`Rejection reason: ${rejectionReason}`);

    // TODO: Implement reject logic with reason
    // This would typically make an API call to update the submission status with the reason

    // Update the UI to show rejected state
    const statusBadge = document.querySelector('.status-badge');
    if (statusBadge) {
        statusBadge.textContent = 'Rejected';
        statusBadge.classList.remove('pending', 'waiting', 'in-progress');
        statusBadge.classList.add('rejected');
    }

    // Hide modal
    hideRejectionModal();

    // Show notification
    alert(`Submission for ${studentName} has been rejected.\n\nReason: ${rejectionReason}`);
}

// Document Browser Functionality
function setupDocumentBrowser() {
    // Setup student docs items
    const studentDocItems = document.querySelectorAll('#student-docs-tab .doc-item');
    studentDocItems.forEach(item => {
        item.addEventListener('click', function() {
            const docId = this.getAttribute('data-doc');
            const docName = this.querySelector('.doc-name').textContent;
            selectDocument('student', this, docId, docName);
        });
    });

    // Setup additional docs items
    const additionalDocItems = document.querySelectorAll('#additional-docs-tab .doc-item');
    additionalDocItems.forEach(item => {
        item.addEventListener('click', function() {
            const docId = this.getAttribute('data-doc');
            const docName = this.querySelector('.doc-name').textContent;
            selectDocument('additional', this, docId, docName);
        });
    });
}

function selectDocument(type, clickedItem, docId, docName) {
    // Remove active class from all items in the same tab
    const tabId = type === 'student' ? 'student-docs-tab' : 'additional-docs-tab';
    const allItems = document.querySelectorAll(`#${tabId} .doc-item`);
    allItems.forEach(item => item.classList.remove('active'));

    // Add active class to clicked item
    clickedItem.classList.add('active');

    // Update document title
    const titleElementId = type === 'student' ? 'student-doc-title' : 'additional-doc-title';
    const titleElement = document.getElementById(titleElementId);
    if (titleElement) {
        titleElement.textContent = docName;
    }

    // Update PDF placeholder text
    const pdfPlaceholder = clickedItem.closest('.docs-right-pane').querySelector('.pdf-placeholder p');
    if (pdfPlaceholder) {
        pdfPlaceholder.textContent = `${docName} PDF`;
    }

    console.log(`Selected document: ${docName} (${docId}) from ${type} docs`);

    // In production, you would load the actual PDF here
    // For example: loadPDF(docId);
}

// Setup Rejection Modal Event Listeners
function setupRejectionModal() {
    const cancelBtn = document.getElementById('cancelRejection');
    const confirmBtn = document.getElementById('confirmRejection');
    const closeBtn = document.getElementById('closeModalBtn');
    const modalOverlay = document.getElementById('rejectionModal');

    // Cancel button handler
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            hideRejectionModal();
        });
    }

    // Confirm reject button handler
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            confirmRejection();
        });
    }

    // Close button (X icon) handler
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hideRejectionModal();
        });
    }

    // Close modal when clicking outside
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                hideRejectionModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('rejectionModal');
            if (modal && modal.classList.contains('active')) {
                hideRejectionModal();
            }
        }
    });

    console.log('Rejection modal event listeners setup complete');
}

// Navigation helper - can be called from other pages
function navigateToSubmissionPage(studentName, status = 'Pending') {
    // Store student info for the submission page to use
    sessionStorage.setItem('currentStudent', studentName);
    sessionStorage.setItem('currentStatus', status);

    // Navigate to submission page
    window.location.href = 'submission-page.html';
}

// Make function available globally
window.navigateToSubmissionPage = navigateToSubmissionPage;
