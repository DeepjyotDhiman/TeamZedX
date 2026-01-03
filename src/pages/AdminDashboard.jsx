import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Clock, Calendar, PieChart, LogOut, Search } from 'lucide-react';
import AttendanceList from '../features/attendance/AttendanceList';
import TimeOffView from '../features/timeoff/TimeOffView';
import EmployeeGrid from '../components/EmployeeGrid';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('employees');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser'); //
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar - Master Theme */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <div className="border border-slate-300 px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter text-center">Company Logo</div>
          <p className="text-[10px] text-rose-400 font-bold mt-2 uppercase italic text-center">Admin Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <SidebarBtn active={activeTab === 'employees'} onClick={() => setActiveTab('employees')} icon={<Users size={18}/>} label="Staff Directory" />
          <SidebarBtn active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')} icon={<Clock size={18}/>} label="Staff Attendance" />
          <SidebarBtn active={activeTab === 'timeoff'} onClick={() => setActiveTab('timeoff')} icon={<Calendar size={18}/>} label="Leave Approvals" />
          <SidebarBtn active={activeTab === 'payroll'} onClick={() => setActiveTab('payroll')} icon={<PieChart size={18}/>} label="Payroll Management" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-400 hover:text-rose-500 transition-colors group">
            <LogOut size={18} className="group-hover:stroke-rose-500"/> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold italic text-slate-700 capitalize underline decoration-slate-100">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 bg-slate-50 border rounded-full text-xs outline-none focus:ring-1 focus:ring-rose-200 w-48 italic" />
              <Search className="absolute left-3 top-2 text-slate-400" size={14} />
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'employees' && <EmployeeGrid isAdmin={true} />}
          {activeTab === 'attendance' && <AttendanceList isAdmin={true} />}
          {activeTab === 'timeoff' && <TimeOffView isAdmin={true} />}
        </div>
      </main>
    </div>
  );
}

function SidebarBtn({ active, onClick, icon, label }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-rose-50 text-rose-500 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}>
      {icon} {label}
    </button>
  );
}