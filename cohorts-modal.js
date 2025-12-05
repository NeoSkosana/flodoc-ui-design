document.addEventListener('DOMContentLoaded', function() {
    setupQualificationDropdown();
    setupCheckboxListener();

    // Also set up a MutationObserver to watch for changes in the modal
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    const checkbox = document.getElementById('confirmCreate');
                    const button = document.getElementById('createBtn');
                    if (checkbox && button) {
                        console.log('MutationObserver: Found checkbox and button');
                        // Set up listener immediately
                        checkbox.addEventListener('change', function() {
                            console.log('MutationObserver checkbox change:', this.checked);
                            button.disabled = !this.checked;
                        });
                        // Set initial state
                        button.disabled = !checkbox.checked;
                    }
                }
            });
        });
        observer.observe(modalContent, { childList: true, subtree: true });
    }
});

let currentStep = 1;
const totalSteps = 4;

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

function setupQualificationDropdown() {
    const setaType = document.getElementById('setaType');
    const qualification = document.getElementById('qualification');

    setaType.addEventListener('change', function() {
        updateQualificationOptions(this.value);
    });
}

function setupCheckboxListener() {
    const confirmCheckbox = document.getElementById('confirmCreate');
    const createBtn = document.getElementById('createBtn');

    console.log('Setting up checkbox listener');
    console.log('Checkbox found:', !!confirmCheckbox);
    console.log('Button found:', !!createBtn);

    if (confirmCheckbox && createBtn) {
        confirmCheckbox.addEventListener('change', function() {
            console.log('Checkbox changed:', this.checked);
            console.log('Current step:', currentStep);
            createBtn.disabled = !this.checked;
            console.log('Button disabled set to:', !this.checked);
        });

        // Also check initial state in case we're on step 4 when this runs
        if (currentStep === 4) {
            createBtn.disabled = !confirmCheckbox.checked;
        }
    } else {
        console.log('Checkbox or button not found!');
    }
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

function openModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    currentStep = 1;
    updateStepDisplay();
}

function closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore background scrolling
    resetForm();
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
    if (currentStep === 4) {
        updateReviewContent();

        // Ensure checkbox listener is set up and button state is correct
        const confirmCheckbox = document.getElementById('confirmCreate');
        const createBtn = document.getElementById('createBtn');
        if (confirmCheckbox && createBtn) {
            createBtn.disabled = !confirmCheckbox.checked;
            console.log('updateStepDisplay: Set button disabled to:', !confirmCheckbox.checked);
        }
    }
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const createBtn = document.getElementById('createBtn');
    const confirmCheckbox = document.getElementById('confirmCreate');

    // Previous button
    prevBtn.disabled = currentStep === 1;

    // Next/Create buttons
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        createBtn.style.display = 'block';

        // Enable button if checkbox is checked
        if (confirmCheckbox) {
            createBtn.disabled = !confirmCheckbox.checked;
            console.log('updateButtons: Button disabled set to:', !confirmCheckbox.checked);
        } else {
            createBtn.disabled = true;
        }
    } else {
        nextBtn.style.display = 'block';
        createBtn.style.display = 'none';
        nextBtn.disabled = !isCurrentStepComplete();
    }
}

function validateCurrentStep() {
    const requiredFields = [];

    switch (currentStep) {
        case 1:
            requiredFields.push('cohortName', 'setaType', 'qualification', 'programType');
            break;
        case 2:
            requiredFields.push('numberOfStudents', 'startDate', 'endDate');
            break;
        case 3:
            // This step is for review only - no validation needed
            return true;
        case 4:
            // Confirmation checkbox
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

function isCurrentStepComplete() {
    const requiredFields = [];

    switch (currentStep) {
        case 1:
            requiredFields.push('cohortName', 'setaType', 'qualification', 'programType');
            break;
        case 2:
            requiredFields.push('numberOfStudents', 'startDate', 'endDate');
            break;
        case 3:
            // This step is for review only - always complete if steps 1-2 are done
            return true;
        case 4:
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

function updateReviewContent() {
    const reviewContent = document.getElementById('reviewContent');
    const formData = collectFormData();

    reviewContent.innerHTML = `
        <div style="display: grid; gap: var(--space-3);">
            <div><strong>Cohort Name:</strong> ${formData.cohortName || 'Not specified'}</div>
            <div><strong>SETA Type:</strong> ${formData.setaType || 'Not specified'}</div>
            <div><strong>Qualification:</strong> ${formData.qualification || 'Not specified'}</div>
            <div><strong>NQF Level:</strong> Level ${formData.cohortType || 'Not specified'}</div>
            <div><strong>Number of Students:</strong> ${formData.numberOfStudents || 'Not specified'}</div>
            <div><strong>Sponsor:</strong> ${formData.sponsor || 'Not specified'}</div>
            <div><strong>Sponsor Company:</strong> ${formData.sponsorCompany || 'Not specified'}</div>
            <div><strong>Duration:</strong> ${formData.duration || 'Not specified'}</div>
            <div><strong>Documents:</strong> ${formData.documents.length > 0 ? formData.documents.join(', ') : 'None selected'}</div>
        </div>
    `;
}

function collectFormData() {
    const documents = [];
    document.querySelectorAll('input[name="documents"]:checked').forEach(checkbox => {
        documents.push(checkbox.nextElementSibling.querySelector('.checkbox-title').textContent);
    });

    return {
        cohortName: document.getElementById('cohortName')?.value || '',
        setaType: document.getElementById('setaType')?.value || '',
        qualification: document.getElementById('qualification')?.value || '',
        cohortType: document.getElementById('cohortType')?.value || '',
        numberOfStudents: document.getElementById('numberOfStudents')?.value || '',
        sponsor: document.getElementById('sponsor')?.value || '',
        sponsorCompany: document.getElementById('sponsorCompany')?.value || '',
        duration: document.getElementById('duration')?.value || '',
        documents: documents
    };
}

function createCohort() {
    if (!validateCurrentStep()) {
        return;
    }

    const formData = collectFormData();

    // In a real application, this would send the data to the server
    console.log('Creating cohort with data:', formData);

    // Show success message
    alert('Cohort created successfully! Redirecting to edit page...');

    // Close modal and reset form
    closeModal();

    // Navigate to cohort edit page
    window.location.href = 'cohort-edit.html';
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

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('modalOverlay');
    const modalContainer = document.querySelector('.modal-container');

    if (event.target === modal && modal.classList.contains('show')) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Debug function - call this from console to manually enable button
window.enableCreateButton = function() {
    const createBtn = document.getElementById('createBtn');
    const confirmCheckbox = document.getElementById('confirmCreate');

    console.log('Manual enable called');
    console.log('Button found:', !!createBtn);
    console.log('Checkbox found:', !!confirmCheckbox);
    console.log('Current step:', currentStep);

    if (createBtn) {
        createBtn.disabled = false;
        console.log('Button manually enabled');
    }
};

// Set up a global click listener to see if checkbox is working and handle button enable
document.addEventListener('click', function(event) {
    if (event.target.id === 'confirmCreate') {
        console.log('Checkbox clicked directly, checked:', event.target.checked);

        // Directly find and enable/disable the button
        const createBtn = document.getElementById('createBtn');
        if (createBtn) {
            createBtn.disabled = !event.target.checked;
            console.log('Button disabled set to:', !event.target.checked);
        }
    }
});

// Also handle checkbox change events globally
document.addEventListener('change', function(event) {
    if (event.target.id === 'confirmCreate') {
        console.log('Checkbox change event, checked:', event.target.checked);

        // Directly find and enable/disable the button
        const createBtn = document.getElementById('createBtn');
        if (createBtn) {
            createBtn.disabled = !event.target.checked;
            console.log('Button disabled set to:', !event.target.checked);
        }
    }
});