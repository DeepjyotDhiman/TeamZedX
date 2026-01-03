import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../api/db';
import { Check, X } from 'lucide-react';
import TimeOffRequestModal from './TimeOffRequestModal';

export default function TimeOffView({ isAdmin }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Real-time listener for Dexie database 
  const requests = useLiveQuery(() => db.leave.toArray());

  const handleApprove = async (id) => {
    await db.leave.update(id, { status: 'Approved' });
  };

  const handleReject = async (id) => {
    await db.leave.update(id, { status: 'Rejected' });
  };

  return (
    <div className="space-y-6">
      <button onClick={() => setIsModalOpen(true)} className="bg-rose-400 text-white px-6 py-2 rounded font-bold uppercase text-[10px]">New Request</button>
      
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-[10px]">
          <thead className="bg-slate-50 border-b font-black text-slate-400">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Status</th>
              {isAdmin && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {requests?.map((req) => (
              <tr key={req.id} className="border-b italic font-bold">
                <td className="px-6 py-4">{req.employeeName || req.employeeId}</td>
                <td className={`px-6 py-4 ${req.status === 'Approved' ? 'text-emerald-500' : 'text-blue-500'}`}>{req.status}</td>
                {isAdmin && req.status === 'Pending' && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleApprove(req.id)} className="bg-emerald-500 text-white p-1 rounded"><Check size={12}/></button>
                      <button onClick={() => handleReject(req.id)} className="bg-rose-500 text-white p-1 rounded"><X size={12}/></button>
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