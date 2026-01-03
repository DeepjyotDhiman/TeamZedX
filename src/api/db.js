import Dexie from 'dexie';

// We jump to Version 10 to override all your previous 1-5 versions
// and ensure a clean slate for the hackathon demo.
export const db = new Dexie('DayflowHRMS');

db.version(10).stores({
  // ADDED: 'status' to the users index
  users: '++id, &employeeId, &email, role, status', 
  
  // ADDED: 'date' and '[employeeId+date]' for fast Admin lookups
  attendance: '++id, employeeId, date, [employeeId+date], status', 
  
  // LEAVE: Simple tracking
  leave: '++id, employeeId, status',
  
  // PAYROLL: Unique link to employee
  payroll: '++id, &employeeId, baseSalary'
});

// Logic to handle DB opening errors
db.open().catch((err) => {
    console.error("Failed to open db:", err.stack || err);
});