import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Clock, Calendar, User, 
  LogOut, ChevronRight, Settings, Zap 
} from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../api/db';

// Feature Components
import AttendanceList from '../features/attendance/AttendanceList';
import TimeOffView from '../features/timeoff/TimeOffView';
import ProfilePage from './ProfilePage';
import EmployeeGrid from '../components/EmployeeGrid';
import logoImg from '../assets/Logo.png';

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('directory');
  const [showReset, setShowReset] = useState(false);
  
  const sessionUser = JSON.parse(localStorage.getItem('currentUser'));
  const today = new Date().toISOString().split('T')[0];

  // 1. WATCH ATTENDANCE: Tracks the button state (Check In/Out)
  const todayRecord = useLiveQuery(
    () => db.attendance.where({ employeeId: sessionUser?.employeeId, date: today }).first(),
    [sessionUser, today]
  );

  // 2. WATCH USER STATUS: Specifically for the Green/Red Indicator dot
  const liveUserStatus = useLiveQuery(
    () => db.users.where("employeeId").equals(sessionUser?.employeeId || "").first(),
    [sessionUser]
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleHardReset = async () => {
    if (window.confirm("CRITICAL: Wipe all local data and reset system?")) {
      await db.delete();
      localStorage.clear();
      window.location.href = '/register';
    }
  };

  const handleAttendance = async () => {
    if (!sessionUser) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    try {
      if (!todayRecord) {
        // ACTION: CHECK IN
        await db.attendance.add({
          employeeId: sessionUser.employeeId,
          date: today,
          checkIn: now,
          status: 'present'
        });
        // Update the users table so the dot turns GREEN
        await db.users.where("employeeId").equals(sessionUser.employeeId).modify({ status: 'present' });
      } else if (!todayRecord.checkOut) {
        // ACTION: CHECK OUT
        await db.attendance.update(todayRecord.id, {
          checkOut: now,
          status: 'absent'
        });
        // Update the users table so the dot turns RED
        await db.users.where("employeeId").equals(sessionUser.employeeId).modify({ status: 'absent' });
      }
    } catch (err) {
      console.error("Shift Toggle Failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDFEFF] font-sans">
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col fixed h-full z-20 shadow-sm">
        <div className="p-8 border-b border-slate-50 flex flex-col items-center">
          <img 
            src={logoImg} 
            alt="Dayflow" 
            className="h-10 mb-2 object-contain" 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <p className="text-[10px] text-blue-600 font-black uppercase italic tracking-widest">Employee Portal</p>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <SidebarLink active={activeTab === 'directory'} onClick={() => setActiveTab('directory')} icon={<Users size={20}/>} label="Staff Directory" />
          <SidebarLink active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')} icon={<Clock size={20}/>} label="My Attendance" />
          <SidebarLink active={activeTab === 'timeoff'} onClick={() => setActiveTab('timeoff')} icon={<Calendar size={20}/>} label="Leave Requests" />
          <SidebarLink active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<User size={20}/>} label="My Identity" />
        </nav>

        <div className="p-6 border-t border-slate-50 bg-slate-50/30">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 mb-6 text-center shadow-sm">
            <p className="text-[9px] font-black text-slate-300 uppercase mb-3 tracking-widest leading-none">
              {todayRecord?.checkIn ? `Shift Start: ${todayRecord.checkIn}` : "System Standby"}
            </p>
            <button 
              onClick={handleAttendance}
              disabled={!!todayRecord?.checkOut}
              className={`w-full py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 shadow-xl ${
                liveUserStatus?.status === 'present' 
                  ? 'bg-rose-500 text-white shadow-rose-200 active:scale-95' 
                  : todayRecord?.checkOut 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white shadow-blue-200 active:scale-95'
              }`}
            >
              {liveUserStatus?.status === 'present' ? 'Check Out' : todayRecord?.checkOut ? 'Shift Done' : 'Check IN'}
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            <button onClick={() => setShowReset(!showReset)} className="flex items-center justify-center gap-2 text-slate-300 hover:text-slate-500 text-[9px] uppercase font-bold">
               <Settings size={12}/> Config
            </button>
            {showReset && (
              <button onClick={handleHardReset} className="py-2 bg-rose-50 text-rose-500 rounded-lg text-[8px] font-black uppercase border border-rose-100 hover:bg-rose-500 hover:text-white transition-all">
                <Zap size={10} className="inline mr-1"/> Hard Reset DB
              </button>
            )}
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 text-slate-400 hover:text-rose-500 font-bold text-[10px] uppercase tracking-widest transition-colors">
              <LogOut size={14}/> Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-72">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 border-b border-slate-100 px-12 py-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-black italic text-slate-800 uppercase tracking-tighter decoration-blue-500/20 underline decoration-4">
            {activeTab}.
          </h2>
          
          <div className="flex items-center gap-3 px-5 py-2 bg-slate-50 rounded-full border border-slate-200 shadow-sm">
             <div className={`w-2.5 h-2.5 rounded-full ${liveUserStatus?.status === 'present' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
               Status: {liveUserStatus?.status === 'present' ? 'Online' : 'Offline'}
             </span>
          </div>
        </header>

        <div className="p-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
          {activeTab === 'directory' && <EmployeeGrid isAdmin={false} />}
          {activeTab === 'attendance' && <AttendanceList isAdmin={false} />}
          {activeTab === 'timeoff' && <TimeOffView isAdmin={false} />}
          {activeTab === 'profile' && <ProfilePage />}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ active, onClick, icon, label }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 translate-x-1' : 'text-slate-400 hover:bg-slate-50'}`}>
      <div className="flex items-center gap-4">
        {icon}
        <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
      </div>
      {active && <ChevronRight size={14} />}
    </button>
  );
}