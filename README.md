🚀 Dayflow HRMS: The Authority Portal
Every workday, perfectly aligned.

Dayflow is a high-performance, real-time Human Resource Management System (HRMS) built for modern teams. It features a robust, role-based architecture that bridges the gap between administrative oversight and employee autonomy through a sleek, high-end "SaaS-style" interface.

🛠 Tech Stack
Frontend: React.js (Vite)

Styling: Tailwind CSS (Glassmorphism & SaaS Aesthetic)

Database: Dexie.js (High-speed IndexedDB wrapper for offline-first persistence)

Icons: Lucide-React

Validation: Zod + React Hook Form

Animation: Tailwind Animate & Framer-style transitions

✨ Key Features
🛡 Master Admin Dashboard
Live Workforce Monitoring: Real-time stats ribbon showing "Active Now," "Pending Leaves," and "Total Staff."

Dynamic Staff Directory: A card-based management system with live status pulse indicators.

Integrated Payroll Command: Direct database manipulation for employee monthly wages with automated HRA/Basic derivation.

Leave Approval Engine: Real-time processing of staff time-off requests.

👤 Employee Identity Portal
Real-Time Attendance Tray: One-touch Check-In/Check-Out system that updates the system-wide status dot instantly.

Personalized Profile: Automated identity generation (OI-ID) based on legal names and joining year.

Salary Breakdown: Visual earnings and deductions table (Basic, HRA, PF, Tax) calculated dynamically from base wages.

Collaboration Grid: View team availability at a glance without administrative permissions.

⚙ System Intelligence
Real-Time Sync: Powered by useLiveQuery, ensuring that if an employee checks in, the Admin sees the update in milliseconds without a page refresh.

Defensive Architecture: Built-in "Hard Reset" functionality to force-recreate database schemas and clear local cache during deployment or debugging.

📸 System Architecture
🚀 Quick Start & Installation
1. Clone & Install
Bash

git clone https://github.com/DeepjyotDhiman/dayflow-hrms.git
cd dayflow-hrms
npm install

2. Configure Assets
Ensure your company logo is placed at: src/assets/Logo.png

3. Launch Development Server
Bash

npm run dev
🧪 Testing the "Real-Time" Logic
To demonstrate the "Live Sync" to judges:

Open two separate browser windows (one in Incognito).

Login as Admin in one and Employee in the other.

Click "Check IN" on the Employee Dashboard.

Observe the "Active Now" counter on the Admin Dashboard update instantly without a refresh.

⚠️ Troubleshooting (The "Hard Reset")
If you experience database schema errors or "Red Status Dots" due to old browser cache:

Navigate to the Employee Dashboard.

Click "System Configuration" at the bottom of the sidebar.

Click "Hard Reset Database".

The system will wipe all old data and recreate a fresh schema on the next login.

👨‍💻 Project Developers
Team Zedx - Full Stack Architecture & UI Design