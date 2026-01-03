import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../api/db';
import { Card } from '../../components/Card';
import { DollarSign, Info } from 'lucide-react';

export default function EmployeePayroll({ employeeId }) {
  const salaryData = useLiveQuery(
    () => db.payroll.where("employeeId").equals(employeeId).first(),
    [employeeId]
  );

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <DollarSign className="text-emerald-600" /> My Salary Structure
        </h3>
        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold uppercase">Read Only</span>
      </div>

      {!salaryData ? (
        <div className="text-center py-6">
          <p className="text-slate-400 text-sm italic">Salary details not yet updated by HR.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="text-slate-600 text-sm font-medium">Monthly Base Salary</span>
            <span className="text-xl font-bold text-slate-900">${salaryData.baseSalary}</span>
          </div>
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg text-blue-700">
            <Info size={16} className="mt-0.5 shrink-0" />
            <p className="text-xs">
              This is your fixed salary structure. Monthly disbursements are subject to attendance records and leave approvals.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}