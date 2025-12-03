document.addEventListener('DOMContentLoaded', function() {
    // Update active navigation
    function updateActiveNav() {
        const navItems = document.querySelectorAll('.nav-item');
        const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href && href.replace('.html', '') === currentPage.replace('.html', '')) {
                item.classList.add('active');
            }
        });
    }

    // Animate stat numbers on page load
    function animateStatNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const targetValue = parseInt(stat.getAttribute('data-target'));
            let currentValue = 0;
            const increment = Math.ceil(targetValue / 20);

            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(currentValue);
            }, 50);
        });
    }

    // Initialize dashboard
    updateActiveNav();
    animateStatNumbers();
    setupPendingActions();
    setupAgreementActions();
});

function setupPendingActions() {
    const signAllBtn = document.querySelector('.pending-item:first-child .pending-action-btn');
    const reviewCorrectionsBtn = document.querySelector('.pending-item:nth-child(2) .pending-action-btn');
    const reviewSubmissionsBtn = document.querySelector('.pending-item:nth-child(3) .pending-action-btn');

    if (signAllBtn) {
        signAllBtn.addEventListener('click', function() {
            alert('Bulk signing functionality would be implemented here.\n\nThis would allow admins to sign all agreements awaiting their signature in a single action.');
        });
    }

    if (reviewCorrectionsBtn) {
        reviewCorrectionsBtn.addEventListener('click', function() {
            alert('Review corrections functionality would be implemented here.\n\nThis would show all rejected agreements that need student corrections.');
        });
    }

    if (reviewSubmissionsBtn) {
        reviewSubmissionsBtn.addEventListener('click', function() {
            alert('Review submissions functionality would be implemented here.\n\nThis would show all new student submissions awaiting admin review.');
        });
    }
}

function setupAgreementActions() {
    const viewBtns = document.querySelectorAll('.action-btn-small');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const studentName = row.querySelector('.student-info span').textContent;

            alert(`View agreement details for: ${studentName}\n\nThis would open the full agreement with all details, supporting documents, and signature status.`);
        });
    });
}