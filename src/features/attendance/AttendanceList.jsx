import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AttendanceList({ isAdmin }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
        <div className="flex items-center gap-4">
          <h2 className="font-bold italic text-slate-700">Attendance Log</h2>
          <div className="flex gap-1 border border-slate-300 rounded bg-white p-1">
            <button className="hover:bg-slate-50 p-0.5 rounded"><ChevronLeft size={14}/></button>
            <button className="hover:bg-slate-50 p-0.5 rounded"><ChevronRight size={14}/></button>
          </div>
        </div>
        <div className="relative">
          <input type="text" placeholder="Search logs..." className="bg-white border rounded-full px-8 py-1.5 text-xs italic outline-none w-56 shadow-sm" />
          <Search className="absolute left-2.5 top-2 text-slate-300" size={14} />
        </div>
      </div>

      {!isAdmin && (
        <div className="grid grid-cols-4 bg-[#E0F2FE] border border-blue-100 rounded-xl text-center py-3 shadow-sm">
          {['Shift Status', 'Days Present', 'Leaves Count', 'Working Days'].map(h => (
            <div key={h} className="text-[9px] font-black uppercase text-blue-600 border-r border-blue-200 last:border-0">{h}</div>
          ))}
        </div>
      )}

      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-slate-50 border-b">
            <tr className="font-black uppercase text-slate-400">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Check In</th>
              <th className="px-6 py-4">Check Out</th>
              <th className="px-6 py-4">Work Hours</th>
              <th className="px-6 py-4">Extra Hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 italic">
            <tr className="hover:bg-slate-50 font-bold transition-colors">
              <td className="px-6 py-4 text-slate-700">25/10/2025</td>
              <td className="px-6 py-4">10:00 AM</td>
              <td className="px-6 py-4">02:00 PM</td>
              <td className="px-6 py-4 text-blue-500 font-black">04:00 Hrs</td>
              <td className="px-6 py-4 text-emerald-500">01:00 Hrs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}