import React from 'react';
import { Search, Users, ExternalLink } from 'lucide-react';

export default function EmployeeGrid({ isAdmin }) {
  const employees = [
    { id: 'OIPR20260001', name: 'Priyank Garala', status: 'present' },
    { id: 'OILS20260002', name: 'Luminous Raven', status: 'leave' },
    { id: 'OILS20260003', name: 'Raven', status: 'absent' },
    { id: 'OIPR20260004', name: 'Deepjyot', status: 'present' },
    { id: 'OILS20260005', name: 'Lumi', status: 'leave' },
    { id: 'OIPR20260007', name: 'Tirth', status: 'present' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-black italic text-slate-700 uppercase tracking-widest">Team Directory</h3>
        <div className="relative">
          <input type="text" placeholder="Search colleagues..." className="bg-slate-50 border rounded-full px-10 py-2 text-xs italic outline-none w-64 focus:ring-1 focus:ring-blue-200" />
          <Search className="absolute left-3.5 top-2.5 text-slate-400" size={14} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-white border border-slate-200 rounded-2xl p-6 relative group hover:border-blue-200 transition-all shadow-sm">
            <div className="absolute top-4 right-4 flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${emp.status === 'present' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span className="text-[8px] font-bold uppercase text-slate-400">{emp.status}</span>
            </div>
            <div className="w-14 h-14 bg-slate-50 rounded-xl mb-4 flex items-center justify-center text-slate-200 border group-hover:bg-blue-50 group-hover:text-blue-200">
              <Users size={28} />
            </div>
            <h4 className="text-sm font-bold text-slate-700 italic">[{emp.name}]</h4>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{emp.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}