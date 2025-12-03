# **Project Brief: FloDoc**

## **1\. Executive Summary**

This project will create a secure, cost-effective, and custom-built digital signing platform to automate the learnership agreement process. By developing this system in-house, the academy will own a valuable operational asset, eliminating the need for recurring subscription fees to third-party services like DocuSign. The platform will replace the current slow and inefficient manual workflow, dramatically reducing administrative overhead and document turnaround time. This strategic investment will provide a professional, streamlined, and fully trackable experience for our staff, students, and their sponsoring companies, giving us complete control over our core processes.

## **2\. Problem Statement**

The academy's current process for managing learnership agreements is entirely manual, relying on emailing PDFs or physically handling paper forms. This workflow creates significant operational inefficiencies and strategic risks that directly impact the business's bottom line and reputation. The key problems are:

* **Excessive Administrative Overhead**: Staff spend significant hours weekly on low-value tasks like printing, scanning, emailing, and manually tracking the status of each agreement, leading to lost productivity and high operational costs.  
* **Slow Turnaround Times**: The multi-step, manual handoff process between students, sponsors, and the academy can delay the finalization of learnerships by days or even weeks, impacting cash flow and slowing down the core business cycle.  
* **Data Integrity and Compliance Risks**: The manual process is prone to human error, including incorrect data entry, lost documents, or version control issues. This not only compromises the integrity of the agreements but also poses a significant compliance risk.  
* **Lack of Operational Visibility**: Without a centralized system, it is difficult to track the real-time status of any agreement, making it impossible to identify bottlenecks, forecast completion times, or follow up effectively.  
* **Negative Brand Perception**: The current method presents an unprofessional and cumbersome experience for tech-savvy students and high-value corporate sponsors, potentially damaging the academy's reputation as a modern, efficient organization.  
* **Unsustainable Cost of Alternatives**: While third-party solutions like DocuSign exist, their recurring subscription fees represent a significant and ongoing operational expense that the academy can eliminate by investing in a long-term, owned asset.

## **3\. Proposed Solution**

We will develop a web-based platform with three distinct portals designed to directly address the problems of the manual workflow. The core of the solution is a system that uses a modern, user-friendly web form to collect data, which is then used to dynamically populate the official learnership DOCX document template, ensuring data integrity.

The key components of the solution are:

* **Academy Admin Dashboard**: To solve the problems of excessive overhead and lack of visibility, this central control panel will allow administrators to upload student lists, initiate the signing process, monitor the status of all agreements in real-time, verify submissions, and apply the final academy signature in bulk.  
* **Student Portal**: To address the poor user experience, this secure portal will provide a simple, guided, multi-step form for students to complete their section of the agreement, upload required documents, and provide a legally binding digital signature, eliminating the need for printing and scanning.  
* **Sponsor Portal**: To combat slow turnaround times, this efficient dashboard will allow corporate sponsors to view all pending agreements and apply their digital signature to multiple documents in a single bulk action, dramatically speeding up their part of the process.

This solution will be built on a robust and scalable technology stack, utilizing a Python backend for business logic and DOCX templating, a modern JavaScript framework for the user portals, and a PostgreSQL database. This approach creates a single, secure, and auditable source of truth, transforming a fragmented manual process into a streamlined digital workflow that is both cost-effective and professional.

## **4\. Target Users**

The platform serves three distinct user roles, each critical to the workflow, and is constrained by the requirements of a key external stakeholder.

### **Core User Roles**

* **Academy Administrators:** As the system's power users, they manage the entire agreement lifecycle. They need an efficient, centralized dashboard with bulk processing features and real-time status tracking to eliminate manual overhead and gain operational visibility.  
* **Learnership Students:** As the primary data providers, these tech-savvy users need a simple, guided, and mobile-friendly portal to complete their forms and upload documents quickly, removing the friction of the current manual process.  
* **Sponsor Representatives:** As a time-poor but critical part of the approval chain, sponsors require maximum efficiency. Their needs are met with a simple dashboard and a bulk-signing feature to approve multiple agreements in a single action, drastically reducing turnaround time.

### **Compliance Stakeholder**

* **MICTSETA:** This regulatory body is not a direct user, but their requirements are paramount. The system's primary technical challenge is ensuring the final, populated documents are complete, accurate, and perfectly match the officially mandated format to guarantee compliance.

## **5\. Goals & Success Metrics**

To ensure this project delivers tangible value, we will measure its success against the following business and user-centric goals. *Note: All percentage-based targets require establishing a clear, quantitative baseline of the current manual process before development begins.*

### **Primary Business Objectives**

* **Increase Operational Efficiency:** Significantly decrease the man-hours required to process each learnership agreement and accelerate the overall time to finalization.  
* **Improve Financial Health:** Eliminate recurring software subscription costs by creating a long-term, owned asset and reduce delays that impact cash flow.  
* **Enhance Data Integrity and Compliance:** Minimize human errors in the agreement process, ensuring all submitted documents are accurate and compliant with MICTSETA standards.

### **Key Performance Indicators (KPIs)**

* **Time to Completion:** Reduce the average time for an agreement to move from "Initiated" to "Completed" by 75%.  
* **Admin Processing Time:** Reduce the average active time an admin spends per agreement by 90%.  
* **Correction Rate:** Decrease the percentage of agreements returned to students for correction to less than 5%.  
* **User Satisfaction (CSAT):** Achieve a satisfaction score of over 90% from all user types via a post-completion survey.

## **6\. MVP Scope**

The Minimum Viable Product (MVP) will focus on delivering the core, end-to-end digital workflow that provides immediate value by solving the most critical problems of the manual process.

### **Core MVP Features**

* **End-to-End Digital Workflow:** The complete, three-stage process enabling students, sponsors, and the academy to complete and sign agreements digitally.  
* **Admin Bulk Student Upload:** Admins can upload a CSV file to create student accounts and initiate a new learnership batch.  
* **Dynamic Document Population:** The core technical feature to populate the official MICTSETA DOCX template from web form data.  
* **Supporting Document Uploads:** Students can securely attach their certified ID and qualifications.  
* **Drawn Digital Signatures:** A signature pad for all users to draw their signature, providing a clear intent to sign.  
* **Bulk Signing:** Essential efficiency feature allowing sponsors and academy staff to apply their signature to multiple documents in a single action.  
* **Admin Verification & Rejection:** Admins can review submissions and reject them with an automated email notification, allowing students to log in, correct, and resubmit their form.  
* **Advanced Filtering and Sorting:** Admins can filter agreements by sponsor name, status, or learnership program, and sort alphabetically by student name.  
* **Bulk Download:** Admins can download a ZIP file of all fully signed agreements for a batch.

### **Out of Scope for MVP**

To ensure a focused and timely launch, the following features will be considered for future releases:

* **Excel Export:** Functionality for admins to export a .xls file with student details (Name, Surname, Age, Gender, Program, SETA Type, Sponsor, Start Date, End Date).  
* **SharePoint Integration:** A feature to push completed agreement folders (agreement \+ supporting documents) directly to a SharePoint folder from the system.  
* **In-Platform Messaging System:** The MVP will use automated email notifications for communication.  
* **Direct MICTSETA Submission:** The MVP will produce final documents for manual submission.  
* **Advanced Reporting & Analytics:** Detailed historical dashboards will be a future enhancement.

### **MVP Success Criteria**

The MVP will be considered successful when it meets the following criteria:

* **Stability:** The system can successfully process a batch of at least 10 agreements from initiation to final download without critical errors.  
* **Usability:** All three user types (Admin, Student, Sponsor) can complete their core tasks without needing external assistance.  
* **Compliance:** The final downloaded document is a compliant representation of the official MICTSETA form.  
* **Performance:** The system demonstrates a measurable improvement against the **Time to Completion** KPI compared to the manual baseline.

## **7\. Post-MVP Vision**

Beyond the initial launch, the platform is envisioned to evolve into a comprehensive workflow automation and data management tool.

### **Phase 2 Features**

Following a successful MVP launch, the next priorities will focus on enhancing communication and integration capabilities:

* **Enhanced Communication:** Introduce an in-platform messaging system to streamline the correction and communication process between administrators and students.  
* **Enterprise Integration:** Implement direct integration with SharePoint for seamless document archiving and add functionality to export student and agreement data to Excel for reporting.

### **Long-term Vision**

The long-term goal is to fully automate the administrative lifecycle and unlock the value of the collected data:

* **Full Automation:** Develop a direct, secure submission channel to MICTSETA, removing the final manual step from the process.  
* **Data & Analytics:** Build an advanced reporting and analytics dashboard to provide insights into learnership trends, processing times, and sponsor engagement.

### **Expansion Opportunities**

The platform's architecture will be designed to support future growth, including:

* **Support for other SETAs:** Adapting the system to handle different document templates and workflows for other Sector Education and Training Authorities.  
* **Financial Integration:** Connecting with accounting software to automate invoicing based on finalized agreements.  
* **AI-Powered Verification:** Exploring the use of AI to assist in the verification of uploaded supporting documents.

## **8\. Technical Considerations**

These are initial technical guidelines and constraints that will inform the detailed architecture design.

### **Platform Requirements**

* The solution must be a web-based application accessible on all modern browsers, with a mobile-first responsive design to ensure a seamless experience on any device.

### **Technology Preferences**

* **Backend:** Python. The initial recommendation is to use a robust framework like Django for its built-in admin panel and security features, which could accelerate development.  
* **Frontend:** JavaScript. The initial recommendation is to use React for its vast ecosystem and component-based architecture, which is well-suited for building the user portals.  
* **Database:** PostgreSQL.

### **Core Technical Task**

* The system's primary backend function will be to use the provided MICTSETA DOCX file as a template. It will programmatically insert data collected from the web forms and embed signature images into this template to generate the final, signed documents.

### **Deployment & Hosting**

* **Platform:** The chosen deployment platform is Heroku, a managed Platform-as-a-Service (PaaS).  
* **Compute:** Heroku Basic Dyno for the application server.  
* **Database:** Heroku Postgres Mini plan.  
* **File Storage:** Amazon S3 is required for storing uploaded and generated documents, as Heroku's filesystem is ephemeral.  
* **Estimated Cost:** The combined starting cost is \~$13 USD/month (approx. R235/month) plus minimal costs for S3 storage. *(Disclaimer: Prices are subject to change based on usage and currency exchange rates.)*

### **Security & Compliance**

* **Legally Valid Signatures:** The system must implement a robust audit trail for every signature event to comply with South Africa's ECTA. This trail must securely log the signatory's identity, the exact time of signing, the source IP address, and a cryptographic hash of the document state at the time of signing.  
* **Data Storage:** All user data, especially personal information and uploaded documents, must be stored securely with appropriate access controls.

## **9\. Constraints, Assumptions, and Risks**

### **Constraints & Assumptions**

* **Infrastructure Management:** The decision to use Heroku (a PaaS) is a strategic choice to minimize infrastructure management overhead. This allows the development team to focus on building the application rather than managing servers, security patches, and database backups. This approach is strongly recommended for organizations without a dedicated IT operations team.  
* **User Technical Proficiency:** The solution assumes a baseline level of technical proficiency and access to modern devices/internet for all users (students, sponsors).

### **Identified Risks**

#### **User & Adoption Risks**

* **Adoption Risk (Sponsors):** Time-poor sponsors may reject the platform if the login or signing process has any friction, reverting to manual methods and undermining the system's value.  
* **User Experience Risk (Students):** The assumption of student tech-savviness may be incorrect. A poor mobile experience or difficulties with document uploads could create delays and increase the administrative burden.

#### **Technical & Feature Risks**

* **Compliance Risk:** The most critical risk is that the system-generated documents do not perfectly match the MICTSETA-mandated format, which could lead to the rejection of entire agreement batches.  
* **Feature Risk (Admins):** The success of the admin dashboard hinges on the robustness of its bulk-processing features. Any bugs or edge cases in these core tools could negate the intended efficiency gains.

#### **Goals & Success Metrics Risks**

* **Metric Risk:** The aggressive KPI targets (e.g., 75-90% reduction) may be unrealistic, potentially leading to a perception of failure even if substantial improvements are made.  
* **Data Risk:** The success of the project is tied to metrics that depend on a reliable pre-project baseline. If accurate baseline data for the manual process cannot be established, proving ROI and success against the stated KPIs will be impossible.  
* **External Dependency Risk:** The project's success metrics are heavily dependent on the behavior and adoption rates of external users (students, sponsors). The project could be a technical success but still fail its KPIs if users are slow to adapt or resist the new workflow.  
* **Survey Bias Risk:** The CSAT score could be skewed by a small number of dissatisfied users in one group (e.g., sponsors), masking overall success and failing to provide nuanced feedback for improvement.

#### **MVP Scope Risks**

* **Core Technical Risk:** The "Dynamic Document Population" is the project's most complex technical challenge. Failure to perfectly replicate the official DOCX format could render the entire MVP non-compliant.  
* **Legal Risk:** The "Drawn Digital Signatures" feature may not be legally binding under South Africa's ECTA without a comprehensive audit trail (IP address, timestamp, etc.), which is not explicitly scoped in the MVP.  
* **Scope Creep Risk:** The "Admin Verification & Rejection" feature, particularly the student correction workflow, could introduce unforeseen complexity and delay the MVP.  
* **Usability Risk:** The success of the "Bulk Signing" and "Bulk Upload" features is critical. If these are not intuitive or are prone to errors, they will frustrate users and negate the intended efficiency gains.

### **Open Questions**

* How will the system adapt if MICTSETA updates its official document template in the future?

## **10\. Next Steps**

### **Immediate Actions**

1. **Stakeholder Review:** This Project Brief should be circulated to all key stakeholders for review and feedback.  
2. **Formal Sign-off:** Obtain formal approval on this brief to lock in the scope and vision before proceeding.  
3. **Baseline Measurement:** Initiate the process of gathering quantitative baseline data for the current manual workflow to measure against the KPIs.

### **PM Handoff**

This Project Brief provides the full context for the FloDoc project. The next step is to engage the **Product Manager (PM)** to begin the creation of the detailed **Product Requirements Document (PRD)**. This brief will serve as the primary input for that process.

