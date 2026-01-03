import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../api/db';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { DollarSign, Save } from 'lucide-react';

export default function AdminPayroll() {
  const employees = useLiveQuery(() => db.users.where("role").equals("employee").toArray());
  const payrolls = useLiveQuery(() => db.payroll.toArray());
  const [editingId, setEditingId] = useState(null);
  const [salaryValue, setSalaryValue] = useState("");

  const handleUpdateSalary = async (employeeId) => {
    const existing = await db.payroll.where("employeeId").equals(employeeId).first();
    if (existing) {
      await db.payroll.update(existing.id, { baseSalary: salaryValue });
    } else {
      await db.payroll.add({ employeeId, baseSalary: salaryValue });
    }
    setEditingId(null);
    alert("Salary structure updated successfully.");
  };

  return (
    <Card className="mt-8">
      <div className="flex items-center gap-2 mb-6 text-xl font-bold text-slate-800">
        <DollarSign className="text-purple-600" />
        Admin Payroll Control
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-slate-500 text-sm">
              <th className="py-3 px-4">Employee</th>
              <th className="py-3 px-4">Employee ID</th>
              <th className="py-3 px-4">Base Salary</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map(emp => {
              const salaryRecord = payrolls?.find(p => p.employeeId === emp.employeeId);
              return (
                <tr key={emp.id} className="border-b hover:bg-slate-50">
                  <td className="py-4 px-4 font-medium">{emp.fullName}</td>
                  <td className="py-4 px-4 text-slate-500 font-mono">{emp.employeeId}</td>
                  <td className="py-4 px-4">
                    {editingId === emp.employeeId ? (
                      <input 
                        type="number" 
                        className="border p-1 rounded w-32 outline-blue-600"
                        value={salaryValue}
                        onChange={(e) => setSalaryValue(e.target.value)}
                      />
                    ) : (
                      <span className="font-bold text-slate-700">
                        {salaryRecord ? `$${salaryRecord.baseSalary}` : "Not Set"}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {editingId === emp.employeeId ? (
                      <Button variant="success" onClick={() => handleUpdateSalary(emp.employeeId)}>
                        <Save size={16} />
                      </Button>
                    ) : (
                      <Button variant="secondary" onClick={() => {
                        setEditingId(emp.employeeId);
                        setSalaryValue(salaryRecord?.baseSalary || "");
                      }}>
                        Edit Salary
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}