import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Clock, Calendar, LogOut, 
  Search, ShieldAlert, Activity, TrendingUp 
} from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../api/db';

// Feature Components
import AttendanceList from '../features/attendance/AttendanceList';
import TimeOffView from '../features/timeoff/TimeOffView';
import AdminEmployeeView from '../components/AdminEmployeeView';

// Assets
import logoImg from '../assets/Logo.png'; 

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('employees');
  const navigate = useNavigate();

  // DEFENSIVE QUERIES: Prevent crash if table is missing or DB is locked
  const staffCount = useLiveQuery(async () => {
    try {
      return await db.users.where("role").equals("employee").count();
    } catch (e) { return 0; }
  }) ?? 0;

  const presentCount = useLiveQuery(async () => {
    try {
      return await db.users.where("status").equals("present").count();
    } catch (e) { return 0; }
  }) ?? 0;

  const leaveCount = useLiveQuery(async () => {
    try {
      return await db.leave.where("status").equals("Pending").count();
    } catch (e) { return 0; }
  }) ?? 0;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed h-full shadow-sm z-20">
        <div className="p-8 border-b border-slate-100 flex flex-col items-center text-center">
          <div className="mb-4">
            <img 
              src={logoImg} 
              alt="Dayflow" 
              className="h-12 w-auto object-contain" 
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
          </div>
          <div className="bg-rose-50 px-4 py-1 rounded-full border border-rose-100">
            <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest italic">Authority Portal</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <SidebarBtn active={activeTab === 'employees'} onClick={() => setActiveTab('employees')} icon={<Users size={20}/>} label="Staff Directory" />
          <SidebarBtn active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')} icon={<Clock size={20}/>} label="Live Attendance" />
          <SidebarBtn active={activeTab === 'timeoff'} onClick={() => setActiveTab('timeoff')} icon={<Calendar size={20}/>} label="Leave Approvals" />
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-black uppercase text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
            <LogOut size={18}/> Logout Identity
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-72 min-h-screen">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-10 py-5 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-2xl font-black italic text-slate-800 uppercase tracking-tighter decoration-rose-500/30 underline decoration-4">
            {activeTab.replace('-', ' ')}.
          </h2>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <input type="text" placeholder="Search Database..." className="pl-10 pr-6 py-2 bg-slate-100 border-none rounded-full text-xs outline-none focus:ring-2 focus:ring-rose-500/20 w-64 italic" />
              <Search className="absolute left-3.5 top-2.5 text-slate-400" size={14} />
            </div>
            <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg">
               <ShieldAlert size={14} className="text-rose-500" />
               <span className="text-[10px] font-black uppercase tracking-widest">Root Admin</span>
            </div>
          </div>
        </header>

        <div className="p-10 space-y-10 animate-in fade-in duration-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard icon={<Users className="text-blue-500" />} label="Workforce" count={staffCount} trend="Sync" />
            <StatCard icon={<Activity className="text-emerald-500" />} label="Present Now" count={presentCount} trend="Live" />
            <StatCard icon={<TrendingUp className="text-rose-500" />} label="Pending Leaves" count={leaveCount} trend="Action Req." />
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            {activeTab === 'employees' && <AdminEmployeeView isAdmin={true} />}
            {activeTab === 'attendance' && <AttendanceList isAdmin={true} />}
            {activeTab === 'timeoff' && <TimeOffView isAdmin={true} />}
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarBtn({ active, onClick, icon, label }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${active ? 'bg-rose-500 text-white shadow-xl translate-x-2' : 'text-slate-400 hover:bg-slate-50'}`}>
      {icon} <span className="uppercase tracking-widest text-[11px] font-black">{label}</span>
    </button>
  );
}

function StatCard({ icon, label, count, trend }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-2xl">{icon}</div>
        <span className="text-[9px] font-black text-slate-300 uppercase italic">{trend}</span>
      </div>
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-4xl font-black italic text-slate-800">{count}</p>
    </div>
  );
}