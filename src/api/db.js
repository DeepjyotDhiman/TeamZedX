import Dexie from 'dexie';

export const db = new Dexie('DayflowHRMS');

// Define tables and indexes for efficient searching
db.version(1).stores({
  users: '++id, &employeeId, &email, role', // & denotes unique index
  attendance: '++id, employeeId, date, status',
  leaveRequests: '++id, employeeId, status, startDate, endDate'
});
db.version(2).stores({
  users: '++id, &employeeId, &email, role', 
  // Added [employeeId+date] for fast daily attendance lookups
  attendance: '++id, [employeeId+date], status', 
  leave: '++id, employeeId, status'
});
db.version(3).stores({
  users: '++id, &employeeId, &email, role',
  attendance: '++id, [employeeId+date], status',
  leave: '++id, employeeId, status',
  // New table for salary details
  payroll: '++id, &employeeId, baseSalary' 
});
db.version(4).stores({
  // & = unique, ++ = auto-increment
  users: '++id, &employeeId, &email, role', 
  // date is indexed separately so Admin can query "Today's Attendance"
  attendance: '++id, employeeId, date, [employeeId+date], status', 
  leave: '++id, employeeId, status',
  payroll: '++id, &employeeId, baseSalary'
});