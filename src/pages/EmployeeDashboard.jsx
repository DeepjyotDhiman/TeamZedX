import React from 'react';
import { LogOut, User, Calendar, Clock, LayoutDashboard, Briefcase, ChevronRight } from 'lucide-react';
import AttendanceToggle from '../features/attendance/AttendanceToggle';
import LeaveRequestForm from '../features/leave/LeaveRequestForm';
import LeaveHistory from '../features/leave/LeaveHistory';
import EmployeePayroll from '../features/payroll/EmployeePayroll';

export default function EmployeeDashboard() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <LayoutDashboard size={20} />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">Dayflow</span>
          </div>
          <button onClick={handleLogout} className="text-slate-500 hover:text-red-600 font-medium text-sm flex items-center gap-2 transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Welcome Hero */}
        <section className="bg-white p-8  border-radius: 2rem  border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-slate-900 leading-tight">Good day, <br /><span className="text-blue-600">{user?.fullName}</span></h2>
            <div className="flex gap-4 mt-4">
              <span className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                <Briefcase size={14} /> {user?.employeeId}
              </span>
            </div>
          </div>
          <div className="w-full md:w-80 relative z-10">
            <AttendanceToggle employeeId={user?.employeeId} />
          </div>
          {/* Decorative Background element */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
        </section>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Payroll & Stats */}
          <div className="lg:col-span-4 space-y-8">
            <EmployeePayroll employeeId={user?.employeeId} />
            
            <div className="bg-slate-900 text-white p-8  border-radius: 2rem  shadow-xl">
              <h3 className="font-bold text-lg mb-2">Policy Updates</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Review the updated 2026 Leave Policy document in your profile settings.</p>
              <button className="flex items-center gap-2 text-blue-400 font-bold text-sm hover:gap-3 transition-all">
                Download PDF <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Leave Management */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <LeaveRequestForm employeeId={user?.employeeId} />
              <div className="space-y-4">
                 <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 px-2">
                   <Calendar className="text-purple-600" /> Recent Requests
                 </h3>
                 <LeaveHistory employeeId={user?.employeeId} />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}