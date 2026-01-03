🚀 Dayflow HRMS: The Authority Grid
The future of workforce management, synced in real-time.

Dayflow is a premium, high-performance Human Resource Management System (HRMS) designed for modern enterprises. It bridges the gap between administrative oversight and employee autonomy using a sleek, glassmorphism-inspired interface and an offline-first, real-time database architecture.

🛠 Technical Architecture
Frontend: React.js + Vite (Lightning-fast HMR)

Styling: Tailwind CSS (Modern SaaS Aesthetic)

Database: Dexie.js (High-performance IndexedDB wrapper)

Logic Engine: Zod (Strict schema validation) & React Hook Form

Icons: Lucide-React

✨ Core Functionalities
🛡 Admin Command Center
Workforce Statistics: Live monitoring of "Active Now," "Pending Leaves," and "Total Staff" using database hooks.

Staff Governance: Full directory access with real-time status pulses and unique OI-ID identity tracking.

Dynamic Payroll: Automated derivation of Tax, PF, and HRA based on base salary inputs.

Leave Authority: Instant approval/rejection pipeline for staff time-off requests.

👤 Employee Identity Portal
Live Attendance Tray: A tactile check-in/out system that updates the entire system's status indicators instantly.

Identity Generation: Automated creation of unique OI-ID tags based on name initials and hiring year.

Collaboration Grid: Permission-safe directory to see colleague availability without compromising administrative data.

Personalized Ledger: View dynamic salary breakdowns and attendance history.

⚙ System Resilience & Real-Time Sync
The system utilizes useLiveQuery to ensure that data is reactive. When an employee checks in, the Admin Dashboard's "Active Now" counter updates immediately without a page refresh.

🔄 The "Hard Reset" Protocol
To ensure the system remains stable across different development environments or after schema updates, we have implemented a Factory Reset logic:

Navigate to the Config section in the dashboard.

Trigger Hard Reset Database.

The system wipes all IndexedDB records and refreshes to rebuild a clean schema.

🚀 Installation & Setup
1. Repository Setup
Bash

git clone https://github.com/your-username/dayflow-hrms.git
cd dayflow-hrms
npm install
2. Assets
Place your corporate logo at: src/assets/Logo.png

3. Launch Development Mode
Bash

npm run dev
👨‍💻 Developed By
Team Zedx — Engineering the next generation of work.
