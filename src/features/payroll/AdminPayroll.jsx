import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../api/db';

export default function AdminPayroll() {
  const employees = useLiveQuery(() => db.users.where("role").equals("employee").toArray());
  const [editingId, setEditingId] = useState(null);
  const [tempWage, setTempWage] = useState("");

  const handleSave = async (empId) => {
    // Check if payroll record exists
    const record = await db.payroll.where("employeeId").equals(empId).first();
    
    if (record) {
      await db.payroll.update(record.id, { baseSalary: Number(tempWage) });
    } else {
      await db.payroll.add({ employeeId: empId, baseSalary: Number(tempWage) });
    }
    setEditingId(null);
    alert("Salary synchronized with database.");
  };

  return (
    <div className="bg-white p-8 rounded-sm border border-slate-200">
      <h3 className="text-xl font-black italic mb-6 uppercase tracking-tighter">Payroll Command</h3>
      <table className="w-full text-left text-sm italic">
        <thead className="text-[10px] font-black uppercase text-slate-400 border-b">
          <tr><th className="py-4">Staff Member</th><th className="py-4">Monthly Base</th><th className="py-4">Action</th></tr>
        </thead>
        <tbody>
          {employees?.map(emp => (
            <tr key={emp.employeeId} className="border-b border-slate-50">
              <td className="py-4 font-bold text-slate-700">{emp.fullName}</td>
              <td className="py-4">
                {editingId === emp.employeeId ? (
                  <input autoFocus type="number" value={tempWage} onChange={e => setTempWage(e.target.value)} className="border-b-2 border-rose-500 outline-none w-24 font-black text-rose-500 bg-rose-50" />
                ) : (
                  <span className="font-black text-slate-900">₹{emp.monthlyWage || '---'}</span>
                )}
              </td>
              <td className="py-4">
                <button onClick={() => {
                  if(editingId === emp.employeeId) handleSave(emp.employeeId);
                  else { setEditingId(emp.employeeId); setTempWage(emp.monthlyWage || ""); }
                }} className="text-[10px] font-black uppercase text-blue-500 underline">
                  {editingId === emp.employeeId ? 'Commit' : 'Set Wage'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}