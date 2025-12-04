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

// Modal Functions
function openCreateCohortModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    currentStep = 1;
    updateStepDisplay();
    setupQualificationDropdown();
}

function setupQualificationDropdown() {
    const setaType = document.getElementById('setaType');
    const qualification = document.getElementById('qualification');

    setaType.addEventListener('change', function() {
        updateQualificationOptions(this.value);
    });
}

function updateQualificationOptions(setaValue) {
    const qualification = document.getElementById('qualification');

    // Clear existing options
    qualification.innerHTML = '<option value="">Select Qualification</option>';

    if (setaValue && setaQualifications[setaValue]) {
        setaQualifications[setaValue].forEach(qual => {
            const option = document.createElement('option');
            option.value = qual;
            option.textContent = qual;
            qualification.appendChild(option);
        });
    }
}

// SETA Qualifications Mapping
const setaQualifications = {
    'MICT': [
        'National Certificate: Information Technology: End User Computing (NQF Level 3)',
        'National Certificate: IT Technical Support (NQF Level 4)',
        'National Certificate: IT Systems Support (NQF Level 5)',
        'National Certificate: IT Systems Development (NQF Level 5)',
        'National Certificate: Software Development (NQF Level 5)',
        'National Certificate: Network Engineering (NQF Level 5)',
        'National Certificate: Database Development (NQF Level 5)',
        'National Certificate: Web Development (NQF Level 5)',
        'National Certificate: Cyber Security (NQF Level 5)',
        'National Certificate: Data Science (NQF Level 5)',
        'National Certificate: Digital Marketing (NQF Level 5)'
    ],
    'HWSETA': [
        'National Certificate: Health Care Assistance (NQF Level 4)',
        'National Certificate: Nursing (NQF Level 5)',
        'National Certificate: Pharmacy Assistance (NQF Level 4)',
        'National Certificate: Social Work (NQF Level 5)',
        'National Certificate: Child and Youth Care (NQF Level 4)',
        'National Certificate: Health Promotion (NQF Level 5)',
        'National Certificate: Community Health Work (NQF Level 5)',
        'National Certificate: Mental Health Care (NQF Level 5)',
        'National Certificate: Disability Care (NQF Level 4)',
        'National Certificate: Elderly Care (NQF Level 4)',
        'National Certificate: First Aid Level 1, 2, 3 (NQF Level 1-3)',
        'National Certificate: Occupational Health and Safety (NQF Level 5)'
    ],
    'BANKSETA': [
        'National Certificate: Banking (NQF Level 5)',
        'National Certificate: Microfinance (NQF Level 5)',
        'National Certificate: Financial Services (NQF Level 5)',
        'National Certificate: Credit Management (NQF Level 5)',
        'National Certificate: Treasury Management (NQF Level 5)',
        'National Certificate: Investment Management (NQF Level 5)',
        'National Certificate: Risk Management (Banking) (NQF Level 5)',
        'National Certificate: Compliance (Banking) (NQF Level 5)',
        'National Certificate: Financial Advisory (NQF Level 5)',
        'National Certificate: Branch Management (NQF Level 5)',
        'National Certificate: Digital Banking (NQF Level 5)'
    ],
    'FASSET': [
        'National Certificate: Business Accounting (NQF Level 5)',
        'National Diploma: Management Accounting (NQF Level 6)',
        'National Certificate: Technical Financial Accounting (NQF Level 5)',
        'National Certificate: Bookkeeping (NQF Level 4)',
        'National Certificate: Business Administration (NQF Level 5)',
        'National Certificate: Project Management (NQF Level 5)',
        'National Certificate: Financial Management (NQF Level 5)',
        'National Certificate: Internal Auditing (NQF Level 5)',
        'National Certificate: Tax Administration (NQF Level 5)',
        'National Certificate: Risk Management (NQF Level 5)',
        'National Certificate: Office Administration (NQF Level 5)',
        'Further Education and Training Certificate: Business Administration (NQF Level 4)'
    ],
    'W&RSETA': [
        'National Certificate: Wholesale and Retail Operations (NQF Level 5)',
        'National Certificate: Retail Store Management (NQF Level 4)',
        'National Certificate: Wholesale and Retail Distribution (NQF Level 2)',
        'National Certificate: Buying and Supply Chain Management (NQF Level 5)',
        'National Certificate: Visual Merchandising (NQF Level 4)',
        'National Certificate: Retail Supervision (NQF Level 4)',
        'National Certificate: Store Operations (NQF Level 3)',
        'National Certificate: Sales Management (NQF Level 5)',
        'National Certificate: Customer Service (NQF Level 4)',
        'National Certificate: E-commerce (NQF Level 5)',
        'National Certificate: Logistics Operations (NQF Level 4)',
        'National Certificate: Warehouse Management (NQF Level 4)'
    ],
    'TETA': [
        'National Certificate: Freight Handling (NQF Level 3)',
        'National Certificate: Logistics Management (NQF Level 5)',
        'National Certificate: Supply Chain Management (NQF Level 5)',
        'National Certificate: Road Transport (NQF Level 4)',
        'National Certificate: Rail Operations (NQF Level 4)',
        'National Certificate: Maritime Operations (NQF Level 5)',
        'National Certificate: Aviation Operations (NQF Level 5)',
        'National Certificate: Public Transport Operations (NQF Level 4)',
        'National Certificate: Warehousing and Distribution (NQF Level 4)',
        'National Certificate: Customs Clearing (NQF Level 5)'
    ],
    'merSETA': [
        'National Certificate: Manufacturing Operations (NQF Level 4)',
        'National Certificate: Engineering Technology (NQF Level 5)',
        'National Certificate: Mechanical Engineering (NQF Level 5)',
        'National Certificate: Electrical Engineering (NQF Level 5)',
        'National Certificate: Civil Engineering (NQF Level 5)',
        'National Certificate: Chemical Engineering (NQF Level 5)',
        'National Certificate: Industrial Engineering (NQF Level 5)',
        'National Certificate: Production Management (NQF Level 5)',
        'National Certificate: Quality Management (NQF Level 5)',
        'National Certificate: Maintenance Management (NQF Level 5)',
        'National Certificate: Engineering Design (NQF Level 5)',
        'National Certificate: Manufacturing Technology (NQF Level 5)'
    ],
    'AgriSETA': [
        'National Certificate: Agriculture Plant Production (NQF Level 4)',
        'National Certificate: Animal Production (NQF Level 4)',
        'National Certificate: Mixed Farming Systems (NQF Level 4)',
        'National Certificate: Horticulture (NQF Level 4)',
        'National Certificate: Agricultural Management (NQF Level 5)',
        'National Certificate: Nature Conservation (NQF Level 5)',
        'National Certificate: Environmental Management (NQF Level 5)',
        'National Certificate: Agricultural Extension (NQF Level 5)',
        'National Certificate: Farm Management (NQF Level 4)',
        'National Certificate: Crop Production (NQF Level 4)',
        'National Certificate: Soil Science (NQF Level 5)',
        'National Certificate: Irrigation Design (NQF Level 5)'
    ],
    'CETA': [
        'National Certificate: Construction Management (NQF Level 5)',
        'National Certificate: Building and Civil Construction (NQF Level 4)',
        'National Certificate: Carpentry and Joinery (NQF Level 4)',
        'National Certificate: Plumbing (NQF Level 4)',
        'National Certificate: Electrical Installation (NQF Level 4)',
        'National Certificate: Painting and Decorating (NQF Level 3)',
        'National Certificate: Bricklaying (NQF Level 3)',
        'National Certificate: Tiling (NQF Level 3)',
        'National Certificate: Plastering (NQF Level 3)',
        'National Certificate: Roofing (NQF Level 3)',
        'National Certificate: Construction Safety (NQF Level 4)',
        'National Certificate: Project Management (Construction) (NQF Level 5)'
    ],
    'PSETA': [
        'National Certificate: Public Administration (NQF Level 5)',
        'National Certificate: Local Government Administration (NQF Level 5)',
        'National Certificate: Public Finance Management (NQF Level 5)',
        'National Certificate: Public Management (NQF Level 5)',
        'National Certificate: Municipal Finance (NQF Level 5)',
        'National Certificate: Municipal Governance (NQF Level 5)',
        'National Certificate: Public Policy Development (NQF Level 5)',
        'National Certificate: Public Sector Communication (NQF Level 5)',
        'National Certificate: Public Sector Leadership (NQF Level 5)',
        'National Certificate: Public Service Ethics (NQF Level 5)',
        'National Certificate: Project Management (Public Sector) (NQF Level 5)',
        'National Certificate: Monitoring and Evaluation (NQF Level 5)'
    ],
    'CATHSSETA': [
        'National Certificate: Tourism Management (NQF Level 5)',
        'National Certificate: Hospitality Management (NQF Level 5)',
        'National Certificate: Professional Cookery (NQF Level 4)',
        'National Certificate: Food and Beverage Management (NQF Level 5)',
        'National Certificate: Event Management (NQF Level 5)',
        'National Certificate: Sports Management (NQF Level 5)',
        'National Certificate: Arts and Culture Management (NQF Level 5)',
        'National Certificate: Tourist Guiding (NQF Level 4)',
        'National Certificate: Hotel Operations (NQF Level 4)',
        'National Certificate: Restaurant Management (NQF Level 5)',
        'National Certificate: Creative Arts (NQF Level 4)',
        'National Certificate: Cultural Heritage Management (NQF Level 5)'
    ],
    'INSETA': [
        'National Certificate: Insurance (NQF Level 5)',
        'National Certificate: Risk Management (NQF Level 5)',
        'National Certificate: Financial Planning (NQF Level 5)',
        'National Certificate: Insurance Sales (NQF Level 4)',
        'National Certificate: Claims Management (NQF Level 5)',
        'National Certificate: Underwriting (NQF Level 5)',
        'National Certificate: Reinsurance (NQF Level 5)',
        'National Certificate: Insurance Brokerage (NQF Level 5)',
        'National Certificate: Loss Adjusting (NQF Level 5)',
        'National Certificate: Actuarial Science (NQF Level 6)',
        'National Certificate: Insurance Marketing (NQF Level 5)'
    ],
    'ServicesSETA': [
        'National Certificate: Project Management (NQF Level 5)',
        'National Certificate: Business Administration (NQF Level 5)',
        'National Certificate: Wholesale and Retail (NQF Level 5)',
        'Further Education and Training Certificate: Project Management (NQF Level 4)',
        'National Certificate: Contact Centre Support (NQF Level 5)',
        'National Certificate: Skills Development Facilitation (NQF Level 5)',
        'Occupational Certificate: New Venture Creation (NQF Level 2)',
        'National Certificate: Entrepreneurship (NQF Level 5)',
        'National Certificate: Assessment Design and Development (NQF Level 5)',
        'National Certificate: Skills Development Practice (NQF Level 5)',
        'National Certificate: Coaching (NQF Level 5)',
        'National Certificate: ECD Practitioner (NQF Level 5)'
    ]
};

// Modal state
let currentStep = 1;
const totalSteps = 3;

function updateStepDisplay() {
    // Hide all sections
    for (let i = 1; i <= totalSteps; i++) {
        const section = document.getElementById(`step${i}`);
        const indicator = document.getElementById(`step${i}Indicator`);

        section.classList.remove('active');
        indicator.classList.remove('active', 'completed');
    }

    // Show current section
    document.getElementById(`step${currentStep}`).classList.add('active');

    // Update progress indicators
    for (let i = 1; i <= currentStep; i++) {
        const indicator = document.getElementById(`step${i}Indicator`);
        indicator.classList.add(i === currentStep ? 'active' : 'completed');
    }

    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${progressPercentage}%`;

    // Update step counter
    document.getElementById('currentStep').textContent = currentStep;

    // Update buttons
    updateButtons();

    // Update review content if on last step
    if (currentStep === 3) {
        updateReviewContent();
    }
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const createBtn = document.getElementById('createBtn');

    // Previous button
    prevBtn.disabled = currentStep === 1;

    // Next/Create buttons
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        createBtn.style.display = 'block';
        createBtn.disabled = !isFormComplete();
    } else {
        nextBtn.style.display = 'block';
        createBtn.style.display = 'none';
        nextBtn.disabled = !isCurrentStepComplete();
    }
}

function isCurrentStepComplete() {
    const requiredFields = [];

    switch (currentStep) {
        case 1:
            requiredFields.push('cohortName', 'setaType', 'qualification', 'programType');
            break;
        case 2:
            requiredFields.push('numberOfStudents', 'sponsorCompany', 'startDate', 'endDate');
            break;
        case 3:
            return document.getElementById('confirmCreate').checked;
    }

    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            return false;
        }
    }

    return true;
}

function isFormComplete() {
    return validateCurrentStep();
}

function validateCurrentStep() {
    const requiredFields = [];

    switch (currentStep) {
        case 1:
            requiredFields.push('cohortName', 'setaType', 'qualification', 'programType');
            break;
        case 2:
            requiredFields.push('numberOfStudents', 'sponsorCompany', 'startDate', 'endDate');
            // Validate that end date is after start date
            const startDate = document.getElementById('startDate');
            const endDate = document.getElementById('endDate');
            if (startDate.value && endDate.value) {
                const start = new Date(startDate.value);
                const end = new Date(endDate.value);
                if (end <= start) {
                    alert('End date must be after start date');
                    return false;
                }
            }
            break;
        case 3:
            const confirmCheckbox = document.getElementById('confirmCreate');
            if (!confirmCheckbox.checked) {
                alert('Please confirm the cohort creation');
                return false;
            }
            return true;
    }

    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            alert(`Please fill in all required fields in this step`);
            return false;
        }
    }

    return true;
}

function updateReviewContent() {
    const reviewContent = document.getElementById('reviewContent');
    const formData = collectFormData();

    reviewContent.innerHTML = `
        <div style="display: grid; gap: var(--space-3);">
            <div><strong>Cohort Name:</strong> ${formData.cohortName || 'Not specified'}</div>
            <div><strong>SETA Type:</strong> ${formData.setaType || 'Not specified'}</div>
            <div><strong>Qualification:</strong> ${formData.qualification || 'Not specified'}</div>
            <div><strong>Program Type:</strong> ${formData.programTypeText || 'Not specified'}</div>
            <div><strong>Number of Students:</strong> ${formData.numberOfStudents || 'Not specified'}</div>
            <div><strong>Sponsor Company:</strong> ${formData.sponsorCompany || 'Not specified'}</div>
            <div><strong>Start Date:</strong> ${formData.startDate || 'Not specified'}</div>
            <div><strong>End Date:</strong> ${formData.endDate || 'Not specified'}</div>
        </div>
    `;
}

function collectFormData() {
    const programType = document.getElementById('programType');
    const programTypeText = programType?.options[programType.selectedIndex]?.text || '';

    return {
        cohortName: document.getElementById('cohortName')?.value || '',
        setaType: document.getElementById('setaType')?.value || '',
        qualification: document.getElementById('qualification')?.value || '',
        programType: document.getElementById('programType')?.value || '',
        programTypeText: programTypeText,
        numberOfStudents: document.getElementById('numberOfStudents')?.value || '',
        sponsorCompany: document.getElementById('sponsorCompany')?.value || '',
        startDate: document.getElementById('startDate')?.value || '',
        endDate: document.getElementById('endDate')?.value || ''
    };
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepDisplay();
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

function createCohort() {
    if (!validateCurrentStep()) {
        return;
    }

    const formData = collectFormData();

    // In a real application, this would send the data to the server
    console.log('Creating cohort with data:', formData);

    // Show success message
    alert('Cohort created successfully!\n\n' + JSON.stringify(formData, null, 2));

    // Close modal and reset form
    closeModal();
}

function closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore background scrolling
    resetForm();
}

function resetForm() {
    // Reset all form fields
    const formInputs = document.querySelectorAll('.form-input, .form-select');
    formInputs.forEach(input => {
        input.value = '';
    });

    // Reset checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset to step 1
    currentStep = 1;
    updateStepDisplay();
}

// Export functionality (placeholder for future implementation)
function exportCohorts() {
    console.log('Export cohorts functionality ready for implementation');
}