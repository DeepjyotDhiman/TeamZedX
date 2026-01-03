import React from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

export default function AttendanceList({ isAdmin }) {
  return (
    <div className="max-w-6xl mx-auto mt-6">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold italic text-slate-700">Attendance</h2>
          
          {/* Date Navigation */}
          <div className="flex items-center gap-2 border border-slate-200 rounded px-2 py-1 bg-white">
            <button className="text-slate-400 hover:text-blue-500"><ChevronLeft size={16} /></button>
            <button className="text-slate-400 hover:text-blue-500"><ChevronRight size={16} /></button>
            <span className="text-xs font-bold text-slate-600 border-l pl-2 ml-1">Date v</span>
            <span className="text-xs font-bold text-slate-600 border-l pl-2">Day</span>
          </div>
        </div>

        {/* Searchbar */}
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="Searchbar" 
            className="w-full pl-8 pr-4 py-1.5 border border-slate-300 rounded text-sm outline-none bg-white italic" 
          />
          <Search className="absolute left-2.5 top-2.5 text-slate-300" size={14} />
        </div>
      </div>

      {/* Stats Header for Employees */}
      {!isAdmin && (
        <div className="grid grid-cols-4 bg-[#E0F2FE] border border-slate-200 text-center mb-4">
          <div className="py-2 border-r border-slate-200 text-[10px] font-black uppercase text-blue-600">Out v</div>
          <div className="py-2 border-r border-slate-200 text-[10px] font-black uppercase text-blue-600">Count of days present</div>
          <div className="py-2 border-r border-slate-200 text-[10px] font-black uppercase text-blue-600">Leaves count</div>
          <div className="py-2 text-[10px] font-black uppercase text-blue-600">Total working days</div>
        </div>
      )}

      {/* Attendance Table */}
      <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-6 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                {isAdmin ? 'Employee' : 'Date'}
              </th>
              <th className="px-6 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">Check In</th>
              <th className="px-6 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">Check Out</th>
              <th className="px-6 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">Work hours</th>
              <th className="px-6 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">Extra hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* Date Grouping Label */}
            <tr className="bg-white">
              <td colSpan="5" className="px-6 py-2 text-[10px] font-bold text-slate-300 italic">
                22, October 2025
              </td>
            </tr>
            
            {/* Example Row */}
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 text-xs font-bold text-slate-700">
                {isAdmin ? '[Employee] Day' : '25/10/2025'}
              </td>
              <td className="px-6 py-4 text-xs font-mono text-slate-600">10:00</td>
              <td className="px-6 py-4 text-xs font-mono text-slate-600">14:00</td>
              <td className="px-6 py-4 text-xs font-mono text-blue-600 font-bold">04:00</td>
              <td className="px-6 py-4 text-xs font-mono text-emerald-600 font-bold">01:00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}