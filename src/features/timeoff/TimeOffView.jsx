import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../api/db';
import { Plus, Check, X } from 'lucide-react';
import TimeOffRequestModal from './TimeOffRequestModal';

export default function TimeOffView({ isAdmin }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sessionUser = JSON.parse(localStorage.getItem('currentUser'));

  // Fetch requests: Admin sees all, Employee sees only theirs
  const requests = useLiveQuery(() => 
    isAdmin ? db.leave.toArray() : db.leave.where("employeeId").equals(sessionUser?.employeeId).toArray()
  , [isAdmin, sessionUser]);

  const updateStatus = async (id, status) => {
    await db.leave.update(id, { status });
  };

  return (
    <div className="space-y-6">
      <button onClick={() => setIsModalOpen(true)} className="bg-rose-400 text-white px-6 py-2 rounded font-bold uppercase text-[10px]">Apply Leave</button>
      
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-[11px] italic">
          <thead className="bg-slate-50 border-b font-black text-slate-400 uppercase">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              {isAdmin && <th className="px-6 py-4 text-right">Approval</th>}
            </tr>
          </thead>
          <tbody>
            {requests?.map((req) => (
              <tr key={req.id} className="border-b font-bold italic">
                <td className="px-6 py-4 text-slate-700">{req.employeeName || req.employeeId}</td>
                <td className="px-6 py-4 text-blue-500 uppercase">{req.leaveType}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase ${
                    req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-500'
                  }`}>{req.status}</span>
                </td>
                {isAdmin && req.status === 'Pending' && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => updateStatus(req.id, 'Approved')} className="bg-emerald-500 text-white p-1 rounded hover:bg-emerald-600"><Check size={12}/></button>
                      <button onClick={() => updateStatus(req.id, 'Rejected')} className="bg-rose-500 text-white p-1 rounded hover:bg-rose-600"><X size={12}/></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TimeOffRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}