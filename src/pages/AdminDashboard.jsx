import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../api/db';
import { Users, CheckCircle, Clock, DollarSign, LogOut, ShieldCheck, Search } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import AdminPayroll from '../features/payroll/AdminPayroll';

export default function AdminDashboard() {
  const employees = useLiveQuery(() => db.users.where("role").equals("employee").toArray());
  const pendingLeaves = useLiveQuery(() => db.leave.where("status").equals("Pending").toArray());
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = useLiveQuery(() => db.attendance.where("date").equals(today).toArray());

  const handleAction = async (id, status) => {
    await db.leave.update(id, { status });
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-slate-900 p-1.5 rounded-lg text-white"><ShieldCheck size={20} /></div>
          <span className="text-xl font-black text-slate-900 tracking-tight italic">ADMIN</span>
        </div>

        <nav className="space-y-1 flex-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Overview</div>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-100 text-slate-900 font-bold">
            <Users size={18} /> Staff Directory
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-50 font-medium">
            <Clock size={18} /> Attendance
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-50 font-medium">
            <DollarSign size={18} /> Payroll
          </button>
        </nav>

        <button onClick={() => { localStorage.clear(); window.location.href='/'; }} className="mt-auto flex items-center gap-3 p-3 text-red-500 font-bold hover:bg-red-50 rounded-xl">
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-6 md:p-10 space-y-10 overflow-y-auto">
        
        {/* Analytics Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Staff" value={employees?.length || 0} icon={<Users />} color="text-blue-600" bg="bg-blue-50" />
          <StatCard label="Present Today" value={todayAttendance?.length || 0} icon={<CheckCircle />} color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard label="Pending Leaves" value={pendingLeaves?.length || 0} icon={<Clock />} color="text-amber-600" bg="bg-amber-50" />
          <StatCard label="Monthly Budget" value="Active" icon={<DollarSign />} color="text-purple-600" bg="bg-purple-50" />
        </div>

        {/* Action Queue & Directory */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Leave Approvals (Action Required) */}
          <div className="xl:col-span-5 space-y-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center justify-between">
              Approval Queue
              <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">{pendingLeaves?.length}</span>
            </h3>
            <div className="space-y-4">
              {pendingLeaves?.map(leave => (
                <Card key={leave.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-slate-800">Employee ID: {leave.employeeId}</p>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-tighter">{leave.leaveType} Type</p>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">PENDING</span>
                  </div>
                  <p className="text-sm text-slate-500 italic mb-6">"{leave.remarks}"</p>
                  <div className="flex gap-2">
                    <Button variant="success" className="flex-1 text-xs" onClick={() => handleAction(leave.id, 'Approved')}>Approve</Button>
                    <Button variant="danger" className="flex-1 text-xs" onClick={() => handleAction(leave.id, 'Rejected')}>Reject</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Directory & Payroll */}
          <div className="xl:col-span-7 space-y-10">
            <Card className="border-none shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900">Staff Directory</h3>
                <div className="bg-slate-100 rounded-lg p-2 flex items-center gap-2"><Search size={14} className="text-slate-400"/><input className="bg-transparent border-none outline-none text-xs w-24" placeholder="Search..."/></div>
              </div>
              <div className="divide-y divide-slate-100">
                {employees?.map(emp => (
                  <div key={emp.id} className="py-4 flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">{emp.fullName[0]}</div>
                      <div>
                        <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{emp.fullName}</p>
                        <p className="text-xs text-slate-400 font-medium">{emp.email}</p>
                      </div>
                    </div>
                    <Button variant="secondary" className="text-xs">Edit</Button>
                  </div>
                ))}
              </div>
            </Card>

            <AdminPayroll />
          </div>

        </div>
      </main>
    </div>
  );
}

// Small Stat Card Helper
function StatCard({ label, value, icon, color, bg }) {
  return (
    <Card className="flex items-center gap-4 border-none shadow-sm">
      <div className={`p-4 rounded-2xl ${bg} ${color}`}>{icon}</div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{label}</p>
        <p className="text-3xl font-black text-slate-900">{value}</p>
      </div>
    </Card>
  );
}