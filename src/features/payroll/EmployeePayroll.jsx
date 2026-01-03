import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../api/db';

export default function EmployeePayroll() {
  const sessionUser = JSON.parse(localStorage.getItem('currentUser'));
  
  // Real-time hook to fetch salary for the logged-in user
  const data = useLiveQuery(
    () => db.payroll.where("employeeId").equals(sessionUser?.employeeId).first(),
    [sessionUser]
  );

  // Math components
  const wage = data?.baseSalary || 0;
  const basic = wage * 0.5;
  const hra = basic * 0.5;
  const pf = wage > 0 ? 3000 : 0;
  const tax = wage > 0 ? 200 : 0;

  return (
    <div className="space-y-10 animate-in fade-in">
       <div className="flex gap-12 items-center">
          <div className="bg-slate-900 text-white p-6 rounded-sm">
             <p className="text-[10px] uppercase font-bold opacity-50 mb-1">Gross Monthly</p>
             <p className="text-3xl font-black italic">₹{wage}</p>
          </div>
          <div className="text-slate-400 italic">
             <p className="text-sm">Yearly Projection</p>
             <p className="text-xl font-bold">₹{wage * 12}</p>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-20">
          <div className="space-y-4">
             <h4 className="text-[10px] font-black uppercase text-slate-400 border-b pb-2">Earnings Breakdown</h4>
             <SalaryLine label="Basic Salary (50%)" value={basic} />
             <SalaryLine label="HRA (50% of Basic)" value={hra} />
          </div>
          <div className="space-y-4">
             <h4 className="text-[10px] font-black uppercase text-slate-400 border-b pb-2">Standard Deductions</h4>
             <SalaryLine label="Provident Fund" value={pf} isRed />
             <SalaryLine label="Professional Tax" value={tax} isRed />
          </div>
       </div>
    </div>
  );
}

function SalaryLine({ label, value, isRed }) {
  return (
    <div className="flex justify-between text-sm italic font-bold">
      <span className="text-slate-500">{label}</span>
      <span className={isRed ? 'text-rose-500' : 'text-slate-900'}>{isRed ? '-' : ''}₹{value}</span>
    </div>
  );
}