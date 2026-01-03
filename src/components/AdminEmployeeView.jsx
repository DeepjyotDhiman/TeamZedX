import React from 'react';
import { Search, Plus, UserPen, CreditCard, ExternalLink, Users } from 'lucide-react';

export default function AdminEmployeeView() {
  // Manual Data Entry
  const employees = [
    { id: 'OIPR20260001', name: 'Priyank Garala', status: 'present', dept: 'HR' },
    { id: 'OILS20260002', name: 'Luminous Raven', status: 'leave', dept: 'Design' },
    { id: 'OILS20260003', name: 'Raven', status: 'absent', dept: 'Engineering' },
    { id: 'OIPR20260004', name: 'Deepjyot', status: 'present', dept: 'Management' },
    { id: 'OILS20260005', name: 'Lumi', status: 'leave', dept: 'Operations' },
    { id: 'OIPR20260007', name: 'Tirth', status: 'present', dept: 'Dev' },
    { id: 'OILS20260009', name: 'Lumi', status: 'leave', dept: 'Support' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-slate-800 italic tracking-tighter uppercase">Staff Directory.</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Authority Management</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input type="text" placeholder="Search ID..." className="bg-slate-50 border rounded-full px-10 py-2.5 text-xs italic outline-none w-64 focus:ring-2 focus:ring-rose-400/20" />
            <Search className="absolute left-3.5 top-3 text-slate-300" size={14} />
          </div>
          <button className="bg-rose-500 text-white p-2.5 rounded-full shadow-lg hover:scale-105 transition-all">
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-white border border-slate-200 p-6 rounded-[2rem] hover:border-rose-400 hover:shadow-xl transition-all group relative">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-rose-500 transition-colors">
                <Users size={24} />
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-100 ${emp.status === 'present' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                 <div className={`w-1.5 h-1.5 rounded-full ${emp.status === 'present' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                 <span className="text-[8px] font-black uppercase">{emp.status}</span>
              </div>
            </div>

            <div className="space-y-1 mb-6">
              <h4 className="font-black text-slate-800 text-base italic">[{emp.name}]</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{emp.id}</p>
            </div>
            
            <div className="flex gap-2 pt-4 border-t border-slate-50">
              <button className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2 rounded-xl text-[9px] font-black uppercase hover:bg-rose-500 transition-all">
                <UserPen size={10} /> Profile
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border border-slate-200 text-slate-400 py-2 rounded-xl text-[9px] font-black uppercase hover:bg-slate-50 transition-all">
                <CreditCard size={10} /> Payroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}