import React, { useState } from 'react';
import { Search, Plus, Check, X as CloseIcon } from 'lucide-react';
import TimeOffRequestModal from './TimeOffRequestModal';

export default function TimeOffView({ isAdmin }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data representing the "For Employees View" and "For Admin & HR Officer"
  const leaveRequests = [
    { id: 1, name: 'Priyank Garala', start: '28/10/2025', end: '28/10/2025', type: 'Paid time Off', status: 'Pending' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Search and Action Bar */}
      <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-rose-400 text-white text-[10px] font-bold px-4 py-1.5 rounded uppercase flex items-center gap-2 shadow-sm"
          >
            <Plus size={12} /> New
          </button>
          <span className="text-slate-400 text-xs font-bold italic">Allocation</span>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Searchbar" 
            className="bg-white border border-slate-200 rounded px-8 py-1.5 text-xs outline-none italic w-64" 
          />
          <Search className="absolute left-2.5 top-2 text-slate-300" size={14} />
        </div>
      </div>

      {/* Allocation Cards */}
      <div className="grid grid-cols-2 gap-8">
        <AllocationCard label="Paid time Off" available="24 Days Available" color="blue" />
        <AllocationCard label="Sick time off" available="07 Days Available" color="rose" />
      </div>

      {/* Time Off Table */}
      <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
        <table className="w-full text-left text-[10px] border-collapse">
          <thead className="bg-slate-50 border-b uppercase font-black text-slate-400">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Start Date</th>
              <th className="px-6 py-4">End Date</th>
              <th className="px-6 py-4">Time Off Type</th>
              <th className="px-6 py-4">Status</th>
              {isAdmin && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leaveRequests.map(req => (
              <tr key={req.id} className="hover:bg-slate-50 transition-colors font-bold italic">
                <td className="px-6 py-4 text-slate-700">[{req.name}]</td>
                <td className="px-6 py-4 text-slate-500">{req.start}</td>
                <td className="px-6 py-4 text-slate-500">{req.end}</td>
                <td className="px-6 py-4 text-blue-500 uppercase tracking-tighter">{req.type}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-slate-400 uppercase">{req.status}</span>
                  </div>
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      {/* Red and Green boxes for Reject & Approve */}
                      <button className="bg-rose-500 text-white p-1 rounded-sm shadow-sm"><CloseIcon size={12}/></button>
                      <button className="bg-emerald-500 text-white p-1 rounded-sm shadow-sm"><Check size={12}/></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Request Modal */}
      <TimeOffRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function AllocationCard({ label, available, color }) {
  const accent = color === 'blue' ? 'text-blue-500 border-blue-400' : 'text-rose-400 border-rose-400';
  return (
    <div className={`p-5 bg-white border border-slate-200 rounded-sm relative border-l-4 ${accent}`}>
      <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${accent}`}>{label}</p>
      <p className="text-slate-400 text-[9px] font-bold italic">{available}</p>
    </div>
  );
}