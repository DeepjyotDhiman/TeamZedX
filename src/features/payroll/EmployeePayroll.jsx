import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../api/db';

export default function EmployeePayroll() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  
  // Use useLiveQuery to prevent white screen while loading
  const payroll = useLiveQuery(
    () => db.payroll.where("employeeId").equals(user?.employeeId).first(),
    [user]
  );

  // Default values if HR hasn't set the salary yet
  const wage = payroll?.baseSalary || 0;
  const basic = wage * 0.5;
  const hra = basic * 0.5;

  return (
    <div className="space-y-8 animate-in fade-in">
       <div className="flex gap-12 text-sm italic font-bold">
          <p>Month Wage: <span className="border-b border-slate-300 px-4">₹{wage}</span></p>
          <p>Yearly Wage: <span className="border-b border-slate-300 px-4">₹{wage * 12}</span></p>
       </div>
       {wage === 0 && <p className="text-[10px] text-rose-400 italic">No salary data found. HR needs to set your wage.</p>}
       
       <div className="grid grid-cols-2 gap-10">
          <div className="space-y-4">
             <h4 className="font-bold text-slate-800 text-sm border-b pb-1">Salary Components</h4>
             <div className="flex justify-between border-b pb-1 text-xs"><span>Basic Salary</span> <span>₹{basic}</span></div>
             <div className="flex justify-between border-b pb-1 text-xs"><span>HRA</span> <span>₹{hra}</span></div>
          </div>
          <div className="space-y-4">
             <h4 className="font-bold text-slate-800 text-sm border-b pb-1">Deductions</h4>
             <div className="flex justify-between border-b pb-1 text-xs text-rose-500"><span>PF</span> <span>-₹3000</span></div>
             <div className="flex justify-between border-b pb-1 text-xs text-rose-500"><span>Professional Tax</span> <span>-₹200</span></div>
          </div>
       </div>
    </div>
  );
}