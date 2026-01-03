import React, { useState, useRef, useEffect } from 'react';
import { Camera, Save, Edit3, Info } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Private Info');
  const fileInputRef = useRef(null);

  // Initializing with session data
  const [userData, setUserData] = useState({
    fullName: "Priyank Garala",
    jobPosition: "Senior HR Officer",
    email: "priyank.g@dayflow.com",
    mobile: "+91 98765 43210",
    company: "Dayflow HR Solutions",
    department: "Human Resources",
    manager: "Corporate Board",
    location: "Ahmedabad, India",
    avatar: null,
    dob: "15/06/1992",
    address: "Satellite, Ahmedabad, Gujarat",
    nationality: "Indian",
    personalEmail: "priyank.private@gmail.com",
    gender: "Male",
    maritalStatus: "Single",
    joiningDate: "01/01/2024",
    bankAccount: "98765432101234",
    bankName: "HDFC Bank",
    ifsc: "HDFC0001234",
    pan: "ABCDE1234F",
    uan: "100987654321",
    empCode: "OIPR20240001",
    monthlyWage: 50000 // Base for automated calculations
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setUserData({ ...userData, avatar: URL.createObjectURL(file) });
  };

  const handleChange = (field, value) => setUserData({ ...userData, [field]: value });

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-700 italic">My Profile</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-md transition-all ${
            isEditing ? 'bg-emerald-500 text-white' : 'bg-rose-400 text-white'
          }`}
        >
          {isEditing ? <><Save size={14}/> Save Changes</> : <><Edit3 size={14}/> Edit Profile</>}
        </button>
      </div>

      <div className="bg-white border border-slate-200 p-10 rounded-3xl shadow-sm relative">
        {/* Header Section */}
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
              <input disabled={!isEditing} value={userData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} className="text-3xl font-bold italic bg-transparent outline-none w-full border-b border-transparent focus:border-rose-300 transition-all" />
              <UnderlinedInput label="Job Position" value={userData.jobPosition} isEditing={isEditing} onUpdate={(v) => handleChange('jobPosition', v)} />
              <UnderlinedInput label="Email" value={userData.email} isEditing={isEditing} onUpdate={(v) => handleChange('email', v)} />
            </div>
            <div className="space-y-4 mt-12">
              <UnderlinedInput label="Company" value={userData.company} isEditing={isEditing} onUpdate={(v) => handleChange('company', v)} />
              <UnderlinedInput label="Location" value={userData.location} isEditing={isEditing} onUpdate={(v) => handleChange('location', v)} />
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 mb-10 border-b border-slate-100">
          {['Private Info', 'Salary Info', 'Security'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-6 py-2 text-xs font-bold rounded-t transition-all ${activeTab === t ? 'bg-slate-50 text-slate-800 border-b-2 border-rose-400' : 'text-slate-400 hover:text-slate-600'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content Rendering */}
        <div className="min-h-[300px]">
          {activeTab === 'Private Info' && (
            <div className="grid grid-cols-2 gap-20">
              <div className="space-y-6">
                <UnderlinedInput label="Date of Birth" value={userData.dob} isEditing={isEditing} onUpdate={(v) => handleChange('dob', v)} />
                <UnderlinedInput label="Residing Address" value={userData.address} isEditing={isEditing} onUpdate={(v) => handleChange('address', v)} />
                <UnderlinedInput label="Gender" value={userData.gender} isEditing={isEditing} onUpdate={(v) => handleChange('gender', v)} />
              </div>
              <div className="space-y-6">
                <h4 className="text-slate-400 text-[10px] font-black italic mb-4 uppercase tracking-widest">Bank Details</h4>
                <UnderlinedInput label="Account Number" value={userData.bankAccount} isEditing={isEditing} onUpdate={(v) => handleChange('bankAccount', v)} />
                <UnderlinedInput label="Bank Name" value={userData.bankName} isEditing={isEditing} onUpdate={(v) => handleChange('bankName', v)} />
                <UnderlinedInput label="IFSC Code" value={userData.ifsc} isEditing={isEditing} onUpdate={(v) => handleChange('ifsc', v)} />
              </div>
            </div>
          )}

          {activeTab === 'Salary Info' && <SalaryTab wage={userData.monthlyWage} isEditing={isEditing} onUpdate={(v) => handleChange('monthlyWage', v)} />}
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

function SalaryTab({ wage, isEditing, onUpdate }) {
  const basic = wage * 0.5; //
  const hra = basic * 0.5;  //

  return (
    <div className="space-y-8 animate-in fade-in">
       <div className="flex gap-12 text-sm italic items-center">
          <p>Month Wage: <span className="font-bold border-b border-slate-300 px-4">₹{wage}</span> / Month</p>
          <p>Yearly Wage: <span className="font-bold border-b border-slate-300 px-4">₹{wage * 12}</span> / Yearly</p>
       </div>
       <div className="grid grid-cols-2 gap-16">
          <div className="space-y-6">
             <h4 className="font-bold text-slate-800 text-sm border-b pb-2 flex justify-between">Salary Components</h4>
             <SalaryRow label="Basic Salary" value={basic} percent="50.00 % of Wage" />
             <SalaryRow label="House Rent Allowance" value={hra} percent="50.00 % of Basic" />
          </div>
          <div className="space-y-6">
             <h4 className="font-bold text-slate-800 text-sm border-b pb-2">Deductions</h4>
             <SalaryRow label="Provident Fund (PF)" value="3000" isRed />
             <SalaryRow label="Professional Tax" value="200" isRed />
          </div>
       </div>
    </div>
  );
}

function SalaryRow({ label, value, percent, isRed }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-100">
      <div className="flex flex-col">
        <span className="text-[11px] text-slate-600 font-bold">{label}</span>
        {percent && <span className="text-[9px] text-slate-400 font-bold uppercase italic tracking-tighter">{percent}</span>}
      </div>
      <span className={`font-mono text-sm font-black ${isRed ? 'text-rose-500' : 'text-slate-900'}`}>{isRed ? '-' : ''}₹{value}</span>
    </div>
  );
}