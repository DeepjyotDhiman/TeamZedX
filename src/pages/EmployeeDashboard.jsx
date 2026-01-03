import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Clock, Calendar, User, LogOut } from 'lucide-react';
import AttendanceList from '../features/attendance/AttendanceList';
import TimeOffView from '../features/timeoff/TimeOffView';
import ProfilePage from './ProfilePage';
import EmployeeGrid from '../components/EmployeeGrid';

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState('directory');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => navigate('/login');

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <div className="border border-slate-300 px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Company Logo</div>
          <p className="text-[10px] text-blue-500 font-bold mt-2 uppercase italic">Employee Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <SidebarBtn active={activeTab === 'directory'} onClick={() => setActiveTab('directory')} icon={<Users size={18}/>} label="Employee Directory" />
          <SidebarBtn active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')} icon={<Clock size={18}/>} label="My Attendance" />
          <SidebarBtn active={activeTab === 'timeoff'} onClick={() => setActiveTab('timeoff')} icon={<Calendar size={18}/>} label="My Time Off" />
          <SidebarBtn active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<User size={18}/>} label="My Profile" />
        </nav>

        {/* Sidebar Attendance Tray */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4 text-center">
            <p className="text-[9px] font-black text-slate-300 uppercase mb-2">Since 00:00 PM</p>
            <button 
              onClick={() => setIsCheckedIn(!isCheckedIn)}
              className={`w-full py-2 rounded-lg text-[10px] font-bold uppercase transition-all shadow-sm ${
                isCheckedIn ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              }`}
            >
              {isCheckedIn ? 'Check Out' : 'Check IN'}
            </button>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-400 hover:text-rose-500 transition-colors">
            <LogOut size={18}/> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold italic text-slate-700 underline decoration-slate-100">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${isCheckedIn ? 'bg-emerald-500' : 'bg-rose-500'}`} />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Status: {isCheckedIn ? 'Present' : 'Absent'}</span>
          </div>
        </header>
        <div className="p-8">
          {activeTab === 'directory' && <EmployeeGrid isAdmin={false} />}
          {activeTab === 'attendance' && <AttendanceList isAdmin={false} />}
          {activeTab === 'timeoff' && <TimeOffView isAdmin={false} />}
          {activeTab === 'profile' && <ProfilePage isAdmin={false} />}
        </div>
      </main>
    </div>
  );
}

function SidebarBtn({ active, onClick, icon, label }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}>
      {icon} {label}
    </button>
  );
}