import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../api/db';
import { DollarSign, Save } from 'lucide-react';

export default function AdminPayroll() {
  const employees = useLiveQuery(() => db.users.where("role").equals("employee").toArray());
  const [editingId, setEditingId] = useState(null);
  const [wage, setWage] = useState("");

  const saveWage = async (id) => {
    const existing = await db.payroll.where("employeeId").equals(id).first();
    if (existing) {
      await db.payroll.update(existing.id, { baseSalary: wage });
    } else {
      await db.payroll.add({ employeeId: id, baseSalary: wage });
    }
    setEditingId(null);
    alert("Salary Updated");
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 italic">
        <DollarSign className="text-rose-400" /> Payroll Management
      </h3>
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="border-b text-[10px] uppercase font-black text-slate-400">
            <th className="py-3 px-4">Employee</th>
            <th className="py-3 px-4">Wage / Month</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map(emp => (
            <tr key={emp.employeeId} className="border-b hover:bg-slate-50 italic">
              <td className="py-4 px-4 font-bold">{emp.fullName}</td>
              <td className="py-4 px-4">
                {editingId === emp.employeeId ? (
                  <input type="number" value={wage} onChange={(e) => setWage(e.target.value)} className="border-b border-rose-400 outline-none w-24 text-rose-500 font-bold" />
                ) : (
                  <span className="font-bold">₹{emp.monthlyWage || "Not Set"}</span>
                )}
              </td>
              <td className="py-4 px-4">
                <button 
                  onClick={() => editingId === emp.employeeId ? saveWage(emp.employeeId) : setEditingId(emp.employeeId)}
                  className="text-[10px] font-black uppercase text-blue-500 hover:underline"
                >
                  {editingId === emp.employeeId ? "Save" : "Edit Wage"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}