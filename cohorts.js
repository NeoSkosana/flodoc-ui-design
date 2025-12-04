document.addEventListener('DOMContentLoaded', function() {
    // Update active navigation
    function updateActiveNav() {
        const navItems = document.querySelectorAll('.nav-item');
        const currentPage = window.location.pathname.split('/').pop() || 'cohorts.html';

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href && href.replace('.html', '') === currentPage.replace('.html', '')) {
                item.classList.add('active');
            }
        });
    }

    // Initialize cohorts page
    updateActiveNav();
    setupCohortActions();
    setupFiltersAndSorting();
    setupPagination();
});

function setupCohortActions() {
    const cohortActionBtns = document.querySelectorAll('.cohort-action-btn');

    cohortActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cohortCard = this.closest('.cohort-card');
            const cohortName = cohortCard.querySelector('.cohort-name').textContent;
            const cohortStatus = cohortCard.querySelector('.status-badge').textContent.trim();

            handleCohortAction(cohortName, cohortStatus);
        });
    });
}

function handleCohortAction(cohortName, status) {
    if (status === 'Draft') {
        // For draft cohorts, navigate to edit page
        alert(`Edit cohort: ${cohortName}\n\nThis would navigate to the cohort edit page where you can:\n• Update cohort details\n• Add curriculum\n• Set up sponsorship\n• Configure settings`);
    } else {
        // For active/completed cohorts, show details
        alert(`View details for: ${cohortName}\n\nThis would open the cohort details page showing:\n• Student roster\n• Progress tracking\n• Sponsor information\n• Agreement status\n• Performance metrics`);
    }
}

function viewCohort(cohortId) {
    // This function would typically navigate to a detailed cohort view
    console.log(`Viewing cohort: ${cohortId}`);
    // In a real application, this would be: window.location.href = `/cohorts/${cohortId}`;
}

// Filtering and Sorting functionality
function setupFiltersAndSorting() {
    const cohortCards = Array.from(document.querySelectorAll('.cohort-card'));
    let activeFilters = {
        seta: '',
        sponsor: '',
        sort: 'name-asc'
    };

    // Store original cohort data
    const cohortData = cohortCards.map(card => ({
        element: card,
        name: card.querySelector('.cohort-name').textContent.trim(),
        seta: card.querySelector('.cohort-stats .stat-item:nth-child(2) .stat-value').textContent.trim(),
        description: card.querySelector('.cohort-description').textContent.trim(),
        status: card.querySelector('.status-badge').textContent.trim(),
        students: parseInt(card.querySelector('.cohort-stats .stat-item:nth-child(1) .stat-value').textContent.trim()),
        progress: parseInt(card.querySelector('.cohort-stats .stat-item:nth-child(3) .stat-value').textContent.trim().replace('%', '')),
        sponsor: getSponsorFromCohort(card.querySelector('.cohort-name').textContent.trim())
    }));

    // Add event listeners
    document.getElementById('setaFilter').addEventListener('change', (e) => {
        activeFilters.seta = e.target.value;
    });

    document.getElementById('sponsorFilter').addEventListener('change', (e) => {
        activeFilters.sponsor = e.target.value;
    });

    document.getElementById('sortBy').addEventListener('change', (e) => {
        activeFilters.sort = e.target.value;
    });

    // Auto-apply filters on change
    ['setaFilter', 'sponsorFilter', 'sortBy'].forEach(id => {
        document.getElementById(id).addEventListener('change', applyFilters);
    });

    // Helper function to determine sponsor from cohort name
    function getSponsorFromCohort(cohortName) {
        const sponsorMap = {
            'System Development': 'tech-corp',
            'System Administration': 'digital-solutions',
            'Health Support': 'innovation-labs',
            'Digital Marketing': 'education-partners'
        };
        return sponsorMap[cohortName] || 'education-partners';
    }
}

function applyFilters() {
    const setaFilter = document.getElementById('setaFilter').value;
    const sponsorFilter = document.getElementById('sponsorFilter').value;
    const sortBy = document.getElementById('sortBy').value;
    const cohortCards = Array.from(document.querySelectorAll('.cohort-card'));

    // Filter cohorts
    let filteredCards = cohortCards.filter(card => {
        const seta = card.querySelector('.cohort-stats .stat-item:nth-child(2) .stat-value').textContent.trim();
        const cohortName = card.querySelector('.cohort-name').textContent.trim();
        const sponsor = getSponsorFromCohort(cohortName);

        const setaMatch = !setaFilter || seta === setaFilter;
        const sponsorMatch = !sponsorFilter || sponsor === sponsorFilter;

        return setaMatch && sponsorMatch;
    });

    // Sort filtered cohorts
    filteredCards.sort((a, b) => {
        const aName = a.querySelector('.cohort-name').textContent.trim();
        const bName = b.querySelector('.cohort-name').textContent.trim();
        const aProgress = parseInt(a.querySelector('.cohort-stats .stat-item:nth-child(3) .stat-value').textContent.trim().replace('%', ''));
        const bProgress = parseInt(b.querySelector('.cohort-stats .stat-item:nth-child(3) .stat-value').textContent.trim().replace('%', ''));

        switch(sortBy) {
            case 'name-asc':
                return aName.localeCompare(bName);
            case 'name-desc':
                return bName.localeCompare(aName);
            case 'progress-asc':
                return aProgress - bProgress;
            case 'progress-desc':
                return bProgress - aProgress;
            default:
                return 0;
        }
    });

    // Hide all cards first
    cohortCards.forEach(card => {
        card.style.display = 'none';
    });

    // Show filtered and sorted cards
    filteredCards.forEach(card => {
        card.style.display = 'block';
    });

    // Update active filters display
    updateActiveFiltersDisplay(setaFilter, sponsorFilter, sortBy);

    // Show results summary
    showResultsSummary(filteredCards.length, cohortCards.length);
}

function clearFilters() {
    document.getElementById('setaFilter').value = '';
    document.getElementById('sponsorFilter').value = '';
    document.getElementById('sortBy').value = 'name-asc';

    // Show all cards
    document.querySelectorAll('.cohort-card').forEach(card => {
        card.style.display = 'block';
    });

    // Clear active filters display
    document.getElementById('activeFilters').innerHTML = '<span class="no-filters-text">No active filters</span>';

    // Hide results summary
    document.querySelector('.results-summary')?.classList.remove('show');
}

function updateActiveFiltersDisplay(setaFilter, sponsorFilter, sortBy) {
    const activeFiltersContainer = document.getElementById('activeFilters');
    const filters = [];

    if (setaFilter) {
        filters.push(createFilterTag('SETA', setaFilter, 'seta'));
    }

    if (sponsorFilter) {
        const sponsorName = document.querySelector(`#sponsorFilter option[value="${sponsorFilter}"]`).textContent;
        filters.push(createFilterTag('Sponsor', sponsorName, 'sponsor'));
    }

    if (sortBy !== 'name-asc') {
        const sortName = document.querySelector(`#sortBy option[value="${sortBy}"]`).textContent;
        filters.push(createFilterTag('Sort', sortName, 'sort'));
    }

    if (filters.length === 0) {
        activeFiltersContainer.innerHTML = '<span class="no-filters-text">No active filters</span>';
    } else {
        activeFiltersContainer.innerHTML = filters.join('');
    }
}

function createFilterTag(label, value, type) {
    return `
        <div class="active-filter-tag">
            <span class="filter-tag-label">${label}:</span>
            <span class="filter-tag-value">${value}</span>
            <button class="remove-filter" onclick="removeFilter('${type}')" title="Remove filter">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `;
}

function removeFilter(type) {
    switch(type) {
        case 'seta':
            document.getElementById('setaFilter').value = '';
            break;
        case 'sponsor':
            document.getElementById('sponsorFilter').value = '';
            break;
        case 'sort':
            document.getElementById('sortBy').value = 'name-asc';
            break;
    }
    applyFilters();
}

function showResultsSummary(filteredCount, totalCount) {
    let resultsSummary = document.querySelector('.results-summary');

    if (!resultsSummary) {
        resultsSummary = document.createElement('div');
        resultsSummary.className = 'results-summary';
        document.querySelector('.filters-container').insertAdjacentElement('afterend', resultsSummary);
    }

    if (filteredCount === totalCount) {
        resultsSummary.classList.remove('show');
    } else {
        resultsSummary.textContent = `Showing ${filteredCount} of ${totalCount} cohorts`;
        resultsSummary.classList.add('show');
    }
}

function getSponsorFromCohort(cohortName) {
    const sponsorMap = {
        'System Development': 'tech-corp',
        'System Administration': 'digital-solutions',
        'Health Support': 'innovation-labs',
        'Digital Marketing': 'education-partners'
    };
    return sponsorMap[cohortName] || 'education-partners';
}

// Pagination functionality
function setupPagination() {
    updatePaginationDisplay();
}

function goToPage(page) {
    const cohortCards = Array.from(document.querySelectorAll('.cohort-card'));
    const itemsPerPage = 8; // Show 8 cards per page
    const totalItems = cohortCards.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let currentPage = parseInt(document.querySelector('.page-number.active')?.textContent || '1');

    if (page === 'prev') {
        currentPage = Math.max(1, currentPage - 1);
    } else if (page === 'next') {
        currentPage = Math.min(totalPages, currentPage + 1);
    } else {
        currentPage = page;
    }

    // Hide all cards
    cohortCards.forEach(card => {
        card.style.display = 'none';
    });

    // Show cards for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    for (let i = startIndex; i < endIndex; i++) {
        if (cohortCards[i]) {
            cohortCards[i].style.display = 'block';
        }
    }

    // Update pagination controls
    updatePaginationControls(currentPage, totalPages, startIndex + 1, endIndex, totalItems);
}

function updatePaginationControls(currentPage, totalPages, startItem, endItem, totalItems) {
    // Update info text
    document.getElementById('startItem').textContent = startItem;
    document.getElementById('endItem').textContent = endItem;
    document.getElementById('totalItems').textContent = totalItems;

    // Update prev/next buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    // Update page numbers
    const pageNumbers = document.getElementById('pageNumbers');
    pageNumbers.innerHTML = '';

    // Generate page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
        pageNumbers.appendChild(createPageButton(1, false));
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '0 var(--space-2)';
            ellipsis.style.color = 'var(--text-tertiary)';
            pageNumbers.appendChild(ellipsis);
        }
    }

    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.appendChild(createPageButton(i, i === currentPage));
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '0 var(--space-2)';
            ellipsis.style.color = 'var(--text-tertiary)';
            pageNumbers.appendChild(ellipsis);
        }
        pageNumbers.appendChild(createPageButton(totalPages, false));
    }
}

function createPageButton(pageNumber, isActive) {
    const button = document.createElement('button');
    button.className = `page-number ${isActive ? 'active' : ''}`;
    button.textContent = pageNumber;
    button.onclick = () => goToPage(pageNumber);
    return button;
}

function updatePaginationDisplay() {
    const cohortCards = Array.from(document.querySelectorAll('.cohort-card'));
    const totalItems = cohortCards.length;
    const totalPages = Math.ceil(totalItems / 8);

    if (totalPages > 1) {
        goToPage(1);
    } else {
        // Hide pagination if only one page
        document.querySelector('.pagination-container').style.display = 'none';
    }
}

// Override applyFilters to work with pagination
const originalApplyFilters = applyFilters;
applyFilters = function() {
    originalApplyFilters();
    updatePaginationDisplay();
};

// Override clearFilters to work with pagination
const originalClearFilters = clearFilters;
clearFilters = function() {
    originalClearFilters();
    updatePaginationDisplay();
};

// Export functionality (placeholder for future implementation)
function exportCohorts() {
    console.log('Export cohorts functionality ready for implementation');
}