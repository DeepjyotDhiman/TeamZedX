import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../api/db';
import { Clock, UserCheck, UserMinus, Search, Filter } from 'lucide-react';

export default function AttendanceList({ isAdmin }) {
  const sessionUser = JSON.parse(localStorage.getItem('currentUser'));

  // Live Query: Admin sees every log in the system, Employee sees only theirs
  const logs = useLiveQuery(() => 
    isAdmin 
      ? db.attendance.reverse().toArray() 
      : db.attendance.where("employeeId").equals(sessionUser?.employeeId).reverse().toArray()
  , [isAdmin, sessionUser]);

  // Real-time stats for the Header
  const presentCount = logs?.filter(l => l.status === 'present').length || 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Attendance Stats Bar - Only for Admin */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-emerald-600 uppercase">Currently In</p>
              <p className="text-2xl font-black italic text-emerald-700">{presentCount}</p>
            </div>
            <UserCheck className="text-emerald-500 opacity-40" size={32} />
          </div>
          <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-rose-600 uppercase">Outside</p>
              <p className="text-2xl font-black italic text-rose-700">{(logs?.length || 0) - presentCount}</p>
            </div>
            <UserMinus className="text-rose-500 opacity-40" size={32} />
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl flex items-center justify-between shadow-xl">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status</p>
              <p className="text-sm font-bold text-white italic">Live Monitoring Active</p>
            </div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
          </div>
        </div>
      )}

      {/* Control Bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-black italic text-slate-800 uppercase tracking-tighter">
            {isAdmin ? "Global Attendance Logs" : "My Personal Logs"}
          </h3>
          <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold text-slate-400">TODAY</span>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <input type="text" placeholder="Search ID..." className="bg-slate-50 border rounded-full px-10 py-2 text-xs italic outline-none w-48 focus:ring-1 focus:ring-rose-200" />
            <Search className="absolute left-3.5 top-2.5 text-slate-400" size={14} />
          </div>
          <button className="p-2 border rounded-full text-slate-400 hover:bg-slate-50"><Filter size={14}/></button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-[11px] font-bold italic">
          <thead className="bg-slate-50 border-b text-slate-400 uppercase font-black tracking-widest">
            <tr>
              <th className="px-8 py-5">Employee ID</th>
              <th className="px-8 py-5">Date</th>
              <th className="px-8 py-5">Check In</th>
              <th className="px-8 py-5">Check Out</th>
              <th className="px-8 py-5">Shift Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs?.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-8 py-4">
                  <span className="text-blue-500 font-black">[{log.employeeId}]</span>
                </td>
                <td className="px-8 py-4 text-slate-500">{log.date}</td>
                <td className="px-8 py-4">
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-emerald-500" />
                    {log.checkIn}
                  </div>
                </td>
                <td className="px-8 py-4 text-slate-400">
                  {log.checkOut ? (
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-rose-400" />
                      {log.checkOut}
                    </div>
                  ) : (
                    <span className="text-[9px] uppercase tracking-tighter opacity-50 italic">Still Active...</span>
                  )}
                </td>
                <td className="px-8 py-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                    log.status === 'present' 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                      : 'bg-rose-50 border-rose-100 text-rose-600'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'present' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                    <span className="text-[9px] uppercase font-black">{log.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {(!logs || logs.length === 0) && (
          <div className="p-20 text-center space-y-2">
            <p className="text-slate-300 font-black italic text-xl uppercase tracking-widest">Zero Activity Detected</p>
            <p className="text-slate-400 text-xs italic">System is waiting for the first Check-In of the day.</p>
          </div>
        )}
      </div>
    </div>
  );
}