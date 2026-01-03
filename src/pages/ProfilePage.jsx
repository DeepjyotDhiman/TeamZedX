import React, { useState, useRef } from 'react';
import { Camera, Save, Edit3 } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../api/db';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Private Info');
  const fileInputRef = useRef(null);

  // 1. Get current logged-in user from session
  const sessionUser = JSON.parse(localStorage.getItem('currentUser'));

  // 2. Fetch LIVE data from database for THIS specific user
  const userData = useLiveQuery(
    () => db.users.where("employeeId").equals(sessionUser?.employeeId).first(),
    [sessionUser]
  );

  // 3. Fetch Salary data from the payroll table
  const payrollData = useLiveQuery(
    () => db.payroll.where("employeeId").equals(sessionUser?.employeeId).first(),
    [sessionUser]
  );

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file && userData) {
      const avatarUrl = URL.createObjectURL(file);
      await db.users.update(userData.id, { avatar: avatarUrl });
    }
  };

  const handleUpdateField = async (field, value) => {
    if (userData) {
      await db.users.update(userData.id, { [field]: value });
    }
  };

  if (!userData) return <div className="p-10 italic text-slate-400">Syncing Identity...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-700 italic">Welcome, {userData.fullName}</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-md transition-all ${
            isEditing ? 'bg-emerald-500 text-white' : 'bg-rose-400 text-white'
          }`}
        >
          {isEditing ? <><Save size={14}/> Exit Edit Mode</> : <><Edit3 size={14}/> Edit Profile</>}
        </button>
      </div>

      <div className="bg-white border border-slate-200 p-10 rounded-3xl shadow-sm relative">
        <div className="flex gap-12 items-start mb-12">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100 overflow-hidden shadow-inner">
              {userData.avatar ? <img src={userData.avatar} className="w-full h-full object-cover" alt="Profile" /> : <span className="text-rose-300 text-4xl">👤</span>}
            </div>
            <button onClick={() => fileInputRef.current.click()} className="absolute bottom-2 right-2 bg-rose-400 p-2 rounded-full text-white shadow-lg"><Camera size={14} /></button>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handlePhotoChange} accept="image/*" />
          </div>

          <div className="flex-1 grid grid-cols-2 gap-10 pt-4">
            <div className="space-y-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Full Name</p>
              <input disabled={!isEditing} value={userData.fullName} onChange={(e) => handleUpdateField('fullName', e.target.value)} className="text-3xl font-bold italic bg-transparent outline-none w-full border-b border-transparent focus:border-rose-300 transition-all" />
              <UnderlinedInput label="Job Position" value={userData.jobPosition || "Staff"} isEditing={isEditing} onUpdate={(v) => handleUpdateField('jobPosition', v)} />
              <UnderlinedInput label="Email" value={userData.email} isEditing={isEditing} onUpdate={(v) => handleUpdateField('email', v)} />
            </div>
            <div className="space-y-4 mt-12">
              <UnderlinedInput label="Employee ID" value={userData.employeeId} isEditing={false} />
              <UnderlinedInput label="Location" value={userData.location || "Office"} isEditing={isEditing} onUpdate={(v) => handleUpdateField('location', v)} />
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-10 border-b border-slate-100">
          {['Private Info', 'Salary Info'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-6 py-2 text-xs font-bold rounded-t transition-all ${activeTab === t ? 'bg-slate-50 text-slate-800 border-b-2 border-rose-400' : 'text-slate-400 hover:text-slate-600'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="min-h-[300px]">
          {activeTab === 'Private Info' && (
            <div className="grid grid-cols-2 gap-20">
              <div className="space-y-6">
                <UnderlinedInput label="Date of Birth" value={userData.dob || "---"} isEditing={isEditing} onUpdate={(v) => handleUpdateField('dob', v)} />
                <UnderlinedInput label="Residing Address" value={userData.address || "---"} isEditing={isEditing} onUpdate={(v) => handleUpdateField('address', v)} />
              </div>
              <div className="space-y-6">
                <h4 className="text-slate-400 text-[10px] font-black italic mb-4 uppercase tracking-widest">Bank Details</h4>
                <UnderlinedInput label="Account Number" value={userData.bankAccount || "---"} isEditing={isEditing} onUpdate={(v) => handleUpdateField('bankAccount', v)} />
                <UnderlinedInput label="Bank Name" value={userData.bankName || "---"} isEditing={isEditing} onUpdate={(v) => handleUpdateField('bankName', v)} />
              </div>
            </div>
          )}

          {activeTab === 'Salary Info' && (
            <SalaryTab wage={payrollData?.baseSalary || 0} />
          )}
        </div>
      </div>
    </div>
  );
}

function UnderlinedInput({ label, value, isEditing, onUpdate }) {
  return (
    <div className="w-full">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{label}</span>
      <input 
        disabled={!isEditing}
        value={value}
        onChange={(e) => onUpdate(e.target.value)}
        className={`w-full border-b py-1 text-sm outline-none transition-all ${isEditing ? 'border-rose-300 bg-rose-50/20 px-2' : 'border-slate-200 bg-transparent cursor-default'} font-medium text-slate-700 italic`}
      />
    </div>
  );
}

function SalaryTab({ wage }) {
  const basic = wage * 0.5;
  const hra = basic * 0.5;

  return (
    <div className="space-y-8 animate-in fade-in">
       <div className="flex gap-12 text-sm italic items-center">
          <p>Monthly Wage: <span className="font-bold border-b border-slate-300 px-4">₹{wage}</span></p>
          <p>Yearly Wage: <span className="font-bold border-b border-slate-300 px-4">₹{wage * 12}</span></p>
       </div>
       <div className="grid grid-cols-2 gap-16">
          <div className="space-y-6 text-sm italic font-bold">
             <h4 className="font-bold text-slate-800 border-b pb-2">Salary Components</h4>
             <div className="flex justify-between border-b"><span>Basic Salary (50%)</span> <span>₹{basic}</span></div>
             <div className="flex justify-between border-b"><span>HRA (50% of Basic)</span> <span>₹{hra}</span></div>
          </div>
          <div className="space-y-6 text-sm italic font-bold">
             <h4 className="font-bold text-slate-800 border-b pb-2">Deductions</h4>
             <div className="flex justify-between border-b text-rose-500"><span>Provident Fund</span> <span>-₹3000</span></div>
             <div className="flex justify-between border-b text-rose-500"><span>Professional Tax</span> <span>-₹200</span></div>
          </div>
       </div>
    </div>
  );
}