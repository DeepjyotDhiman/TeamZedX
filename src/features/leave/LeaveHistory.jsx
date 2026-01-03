import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../api/db';

export default function LeaveHistory({ employeeId }) {
  const requests = useLiveQuery(
    () => db.leave.where("employeeId").equals(employeeId).reverse().toArray(),
    [employeeId]
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-100 text-emerald-700'; // [cite: 86]
      case 'Rejected': return 'bg-red-100 text-red-700'; // [cite: 87]
      default: return 'bg-amber-100 text-amber-700'; // Pending [cite: 85]
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-xl font-bold text-slate-800 mb-6">My Leave History</h3>
      
      {!requests || requests.length === 0 ? (
        <p className="text-slate-400 italic text-sm">No leave requests found.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="flex justify-between items-center p-4 border rounded-xl hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-bold text-slate-800">{req.leaveType} Leave</p>
                <p className="text-xs text-slate-500">{req.startDate} to {req.endDate}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(req.status)}`}>
                {req.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}