// Individual Cohort Page JavaScript

let hasSubmissions = false; // State variable to track submissions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    initializePage();
    setupActionButtons();
    setupTabs();
    setupViewButtons();
    setupKeyboardShortcuts();
});

function initializePage() {
    // Update active navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.textContent.includes('Cohorts')) {
            item.classList.add('active');
        }
    });
}

function setupActionButtons() {
    // Cohort action button handlers
    const linkBtn = document.querySelector('.cohort-action-btn[title="Link"]');
    const cloneBtn = document.querySelector('.cohort-action-btn[title="Clone"]');
    const editBtn = document.querySelector('.cohort-action-btn[title="Edit"]');
    const archiveBtn = document.querySelector('.cohort-action-btn[title="Archive"]');

    if (linkBtn) {
        linkBtn.addEventListener('click', () => {
            alert('Link functionality - This would allow you to get a shareable link for this cohort');
        });
    }

    if (cloneBtn) {
        cloneBtn.addEventListener('click', () => {
            alert('Clone functionality - This would create a copy of this cohort');
        });
    }

    if (editBtn) {
        editBtn.addEventListener('click', () => {
            alert('Edit functionality - This would open the cohort edit page');
        });
    }

    if (archiveBtn) {
        archiveBtn.addEventListener('click', () => {
            const confirmArchive = confirm('Are you sure you want to archive this cohort?');
            if (confirmArchive) {
                alert('Cohort archived successfully');
            }
        });
    }

    // Next cohort button handler (works in both states)
    const nextCohortBtns = document.querySelectorAll('.next-cohort-btn');
    nextCohortBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navigateToNextCohort();
        });
    });
}

function setupViewButtons() {
    // Setup view buttons for student cards
    const viewBtns = document.querySelectorAll('.view-student-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const studentCard = this.closest('.student-card');
            const studentName = studentCard.querySelector('.student-name').textContent;
            const studentEmail = studentCard.querySelector('.student-email').textContent;
            const studentStatus = studentCard.querySelector('.status-badge.pill').textContent.trim();
            alert(`Viewing ${studentName}\nEmail: ${studentEmail}\nStatus: ${studentStatus}\n\nThis would open the student's detailed profile and submissions.`);
        });
    });
}

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
    // Remove active class from all tabs and buttons
    const allTabButtons = document.querySelectorAll('.tab-button');
    const allTabPanes = document.querySelectorAll('.tab-pane');

    allTabButtons.forEach(button => {
        button.classList.remove('active');
    });

    allTabPanes.forEach(pane => {
        pane.classList.remove('active');
    });

    // Add active class to clicked tab and corresponding pane
    const activeTabButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
    const activeTabPane = document.getElementById(`${tabName}-tab`);

    if (activeTabButton) {
        activeTabButton.classList.add('active');
    }

    if (activeTabPane) {
        activeTabPane.classList.add('active');
    }

    console.log(`Switched to ${tabName} tab`);
}

function toggleSubmissionsState() {
    hasSubmissions = !hasSubmissions;

    const emptyState = document.getElementById('emptyState');
    const studentCardsWrapper = document.getElementById('studentCardsContainer');

    if (hasSubmissions) {
        // Show student cards, hide empty state
        if (emptyState) emptyState.style.display = 'none';
        if (studentCardsWrapper) studentCardsWrapper.style.display = 'flex';
        console.log('Switched to submissions view (with student cards)');
    } else {
        // Show empty state, hide student cards
        if (emptyState) emptyState.style.display = 'flex';
        if (studentCardsWrapper) studentCardsWrapper.style.display = 'none';
        console.log('Switched to no submissions view (empty state)');
    }
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Press 'T' or 't' to toggle between states
        if (event.key === 't' || event.key === 'T') {
            // Only toggle if not typing in an input field
            if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
                toggleSubmissionsState();
                // Show notification
                showToggleNotification();
            }
        }
    });
}

function showToggleNotification() {
    const stateText = hasSubmissions ? 'With Submissions' : 'No Submissions';
    console.log(`%c🔄 Toggled to: ${stateText}`, 'font-size: 14px; font-weight: bold; color: #374151;');

    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #374151;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = `Switched to: ${stateText} (Press T to toggle)`;

    document.body.appendChild(notification);

    // Remove notification after 2 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

function navigateToNextCohort() {
    // In a real application, this would navigate to the next cohort
    // For now, we'll show an alert
    alert('Navigating to next cohort - This would navigate to the next cohort in the list');
    // window.location.href = 'individual-cohort.html?id=next';

    // In production, you would do something like:
    // const nextCohortId = getNextCohortId(currentCohortId);
    // window.location.href = `individual-cohort.html?id=${nextCohortId}`;
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
