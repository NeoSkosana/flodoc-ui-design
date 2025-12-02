document.addEventListener('DOMContentLoaded', function() {
    // Update active navigation
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

    function updateActiveNav() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href && href.replace('.html', '') === currentPage.replace('.html', '')) {
                item.classList.add('active');
            }
        });
    }

    updateActiveNav();

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

    // Quick Actions
    const createNewBtn = document.querySelector('.action-btn.primary');
    const viewAllBtn = document.querySelector('.action-btn.secondary');

    if (createNewBtn) {
        createNewBtn.addEventListener('click', function() {
            alert('Create New Agreement functionality would be implemented here');
        });
    }

    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            alert('View All Documents functionality would be implemented here');
        });
    }

    animateStatNumbers();
});