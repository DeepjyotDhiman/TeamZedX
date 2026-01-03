import Dexie from 'dexie';

export const db = new Dexie('DayflowHRMS');

// Define tables and indexes for efficient searching
db.version(1).stores({
  users: '++id, &employeeId, &email, role', // & denotes unique index
  attendance: '++id, employeeId, date, status',
  leaveRequests: '++id, employeeId, status, startDate, endDate'
});