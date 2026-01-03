import React, { useState } from 'react';

export default function ProfileTabs() {
  const [tab, setTab] = useState('Private Info'); //

  return (
    <div>
      {/* Navigation Buttons */}
      <div className="flex gap-2 mb-10 border-b border-slate-100">
        {['Resume', 'Private Info', 'Salary Info', 'Security'].map(t => (
          <button 
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 text-xs font-bold rounded-t ${
              tab === t ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Private Info Layout */}
      {tab === 'Private Info' && (
        <div className="grid grid-cols-2 gap-20">
          <div className="space-y-6">
            <UnderlinedField label="Date of Birth" />
            <UnderlinedField label="Residing Address" />
            <UnderlinedField label="Nationality" />
            <UnderlinedField label="Personal Email" />
            <UnderlinedField label="Gender" />
            <UnderlinedField label="Marital Status" />
            <UnderlinedField label="Date of Joining" />
          </div>
          <div className="space-y-6">
            <h4 className="text-slate-400 text-[10px] font-black italic mb-4">Bank Details</h4>
            <UnderlinedField label="Account Number" />
            <UnderlinedField label="Bank Name" />
            <UnderlinedField label="IFSC Code" />
            <UnderlinedField label="PAN No" />
            <UnderlinedField label="UAN NO" />
            <UnderlinedField label="Emp Code" />
          </div>
        </div>
      )}

      {/* Salary Info Logic */}
      {tab === 'Salary Info' && <SalaryView />}
    </div>
  );
}

function SalaryView() {
  const wage = 50000; // Monthly Wage
  const basic = wage * 0.5; //
  const hra = basic * 0.5; //

  return (
    <div className="space-y-8 animate-in fade-in">
       <div className="flex gap-12 text-sm italic">
          <p>Month Wage: <span className="font-bold border-b ml-2">{wage}</span> / Month</p>
          <p>Yearly Wage: <span className="font-bold border-b ml-2">{wage * 12}</span> / Yearly</p>
       </div>
       <div className="grid grid-cols-2 gap-10 text-xs">
          <div className="space-y-4">
             <h4 className="font-bold text-slate-800">Salary Components</h4>
             <p className="flex justify-between border-b pb-1">Basic Salary <span className="font-mono">₹{basic}</span></p>
             <p className="flex justify-between border-b pb-1">House Rent Allowance <span className="font-mono">₹{hra}</span></p>
          </div>
          <div className="space-y-4">
             <h4 className="font-bold text-slate-800">Deductions</h4>
             <p className="flex justify-between border-b pb-1">Provident Fund (PF) <span className="text-rose-500">-₹3000</span></p>
             <p className="flex justify-between border-b pb-1">Professional Tax <span className="text-rose-500">-₹200</span></p>
          </div>
       </div>
    </div>
  );
}

function UnderlinedField({ label }) {
  return (
    <div className="w-full">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{label}</span>
      <div className="border-b border-slate-300 w-full h-5 mt-1"></div>
    </div>
  );
}