import React from 'react';
import { Search, Users } from 'lucide-react';

export default function EmployeeGrid({ isAdmin }) {
  // Mock data as per your system requirement
  const employees = [
    { id: 'OIPR20260001', name: 'Priyank Garala', status: 'present' },
    { id: 'OIDS20260002', name: 'Dependable Sandpiper', status: 'leave' },
    { id: 'OILS20260003', name: 'Luminous Raven', status: 'absent' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          {isAdmin && (
            <button className="bg-rose-400 text-white text-[10px] font-bold px-4 py-2 rounded uppercase shadow-md shadow-rose-100">
              + New Staff
            </button>
          )}
          <h3 className="text-sm font-bold italic text-slate-500 underline decoration-slate-200">Staff Directory</h3>
        </div>
        <div className="relative">
          <input type="text" placeholder="Search staff..." className="bg-slate-50 border border-slate-200 rounded-full px-10 py-2 text-xs outline-none italic w-64" />
          <Search className="absolute left-3.5 top-2.5 text-slate-400" size={14} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-white border border-slate-200 rounded-2xl p-6 relative group hover:border-rose-200 transition-all cursor-pointer shadow-sm">
            <div className="absolute top-4 right-4">
              {emp.status === 'present' && <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />}
              {emp.status === 'absent' && <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-white shadow-sm" />}
              {emp.status === 'leave' && <span className="text-xs">✈️</span>}
            </div>
            <div className="w-16 h-16 bg-slate-50 rounded-xl mb-4 flex items-center justify-center text-slate-200 border border-slate-100">
              <Users size={32} />
            </div>
            <h4 className="text-sm font-bold text-slate-700 italic">[{emp.name}]</h4>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{emp.id}</p>
            
            {isAdmin && (
               <div className="mt-4 pt-4 border-t border-slate-50 flex gap-3">
                  <button className="text-[9px] font-bold text-rose-400 uppercase hover:underline">Edit Profile</button>
                  <button className="text-[9px] font-bold text-slate-400 uppercase hover:underline">Payroll</button>
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}