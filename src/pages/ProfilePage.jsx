import React, { useState, useRef } from 'react';
import { Camera, Save, X, Edit3 } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Private Info');
  const fileInputRef = useRef(null);

  // Real Mock Data based on your "Actual Structure"
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
    // Private Info
    dob: "15/06/1992",
    address: "Satellite, Ahmedabad, Gujarat",
    nationality: "Indian",
    personalEmail: "priyank.private@gmail.com",
    gender: "Male",
    maritalStatus: "Single",
    joiningDate: "01/01/2024",
    // Bank Details
    bankAccount: "98765432101234",
    bankName: "HDFC Bank",
    ifsc: "HDFC0001234",
    pan: "ABCDE1234F",
    uan: "100987654321",
    empCode: "OIPR20240001",
    // Salary
    monthlyWage: 50000
  });

  // Handle Photo Upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData({ ...userData, avatar: URL.createObjectURL(file) });
    }
  };

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  return (
    <div className="max-w-5xl mx-auto py-10 animate-in fade-in duration-500">
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

      <div className="bg-white border border-slate-200 p-10 rounded-sm shadow-sm relative">
        {/* Header Section */}
        <div className="flex gap-12 items-start mb-12">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100 overflow-hidden">
              {userData.avatar ? (
                <img src={userData.avatar} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <span className="text-rose-300 text-4xl">👤</span>
              )}
            </div>
            {/* Edit Photo Icon */}
            <button 
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-2 right-2 bg-rose-400 p-2 rounded-full text-white hover:scale-110 transition-transform shadow-lg"
            >
              <Camera size={14} />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handlePhotoChange} accept="image/*" />
          </div>

          <div className="flex-1 grid grid-cols-2 gap-10 pt-4">
            <div className="space-y-4">
              <input 
                disabled={!isEditing}
                value={userData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="text-3xl font-bold italic bg-transparent outline-none w-full border-b border-transparent focus:border-rose-300"
              />
              <UnderlinedInput label="Job Position" value={userData.jobPosition} isEditing={isEditing} onUpdate={(v) => handleChange('jobPosition', v)} />
              <UnderlinedInput label="Email" value={userData.email} isEditing={isEditing} onUpdate={(v) => handleChange('email', v)} />
              <UnderlinedInput label="Mobile" value={userData.mobile} isEditing={isEditing} onUpdate={(v) => handleChange('mobile', v)} />
            </div>
            <div className="space-y-4 mt-12">
              <UnderlinedInput label="Company" value={userData.company} isEditing={isEditing} onUpdate={(v) => handleChange('company', v)} />
              <UnderlinedInput label="Department" value={userData.department} isEditing={isEditing} onUpdate={(v) => handleChange('department', v)} />
              <UnderlinedInput label="Manager" value={userData.manager} isEditing={isEditing} onUpdate={(v) => handleChange('manager', v)} />
              <UnderlinedInput label="Location" value={userData.location} isEditing={isEditing} onUpdate={(v) => handleChange('location', v)} />
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 mb-10 border-b border-slate-100">
          {['Resume', 'Private Info', 'Salary Info', 'Security'].map(t => (
            <button 
              key={t} 
              onClick={() => setActiveTab(t)} 
              className={`px-6 py-2 text-xs font-bold rounded-t transition-colors ${
                activeTab === t ? 'bg-slate-100 text-slate-800 border-b-2 border-rose-400' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content Rendering */}
        <div className="min-h-[400px]">
          {activeTab === 'Private Info' && (
            <div className="grid grid-cols-2 gap-20 animate-in slide-in-from-bottom-2">
              <div className="space-y-6">
                <UnderlinedInput label="Date of Birth" value={userData.dob} isEditing={isEditing} onUpdate={(v) => handleChange('dob', v)} />
                <UnderlinedInput label="Residing Address" value={userData.address} isEditing={isEditing} onUpdate={(v) => handleChange('address', v)} />
                <UnderlinedInput label="Nationality" value={userData.nationality} isEditing={isEditing} onUpdate={(v) => handleChange('nationality', v)} />
                <UnderlinedInput label="Personal Email" value={userData.personalEmail} isEditing={isEditing} onUpdate={(v) => handleChange('personalEmail', v)} />
                <UnderlinedInput label="Gender" value={userData.gender} isEditing={isEditing} onUpdate={(v) => handleChange('gender', v)} />
                <UnderlinedInput label="Marital Status" value={userData.maritalStatus} isEditing={isEditing} onUpdate={(v) => handleChange('maritalStatus', v)} />
                <UnderlinedInput label="Date of Joining" value={userData.joiningDate} isEditing={isEditing} onUpdate={(v) => handleChange('joiningDate', v)} />
              </div>
              <div className="space-y-6">
                <h4 className="text-slate-400 text-[10px] font-black italic mb-4 uppercase tracking-widest">Bank Details</h4>
                <UnderlinedInput label="Account Number" value={userData.bankAccount} isEditing={isEditing} onUpdate={(v) => handleChange('bankAccount', v)} />
                <UnderlinedInput label="Bank Name" value={userData.bankName} isEditing={isEditing} onUpdate={(v) => handleChange('bankName', v)} />
                <UnderlinedInput label="IFSC Code" value={userData.ifsc} isEditing={isEditing} onUpdate={(v) => handleChange('ifsc', v)} />
                <UnderlinedInput label="PAN No" value={userData.pan} isEditing={isEditing} onUpdate={(v) => handleChange('pan', v)} />
                <UnderlinedInput label="UAN NO" value={userData.uan} isEditing={isEditing} onUpdate={(v) => handleChange('uan', v)} />
                <UnderlinedInput label="Emp Code" value={userData.empCode} isEditing={isEditing} onUpdate={(v) => handleChange('empCode', v)} />
              </div>
            </div>
          )}

          {activeTab === 'Salary Info' && <SalaryTab wage={userData.monthlyWage} isEditing={isEditing} onUpdate={(v) => handleChange('monthlyWage', v)} />}
        </div>
      </div>
    </div>
  );
}

// Helper: The "Underlined" Field
function UnderlinedInput({ label, value, isEditing, onUpdate }) {
  return (
    <div className="w-full group">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{label}</span>
      <input 
        disabled={!isEditing}
        value={value}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="----------"
        className={`w-full border-b py-1 text-sm outline-none transition-all ${
          isEditing 
          ? 'border-rose-300 bg-rose-50/30 px-2' 
          : 'border-slate-300 bg-transparent cursor-default'
        } font-medium text-slate-700 italic`}
      />
    </div>
  );
}

// Sub-Component: Salary Info with Calculations
function SalaryTab({ wage, isEditing, onUpdate }) {
  const basic = wage * 0.5; // Basic is 50% of Wage
  const hra = basic * 0.5;  // HRA is 50% of Basic

  return (
    <div className="space-y-10 animate-in fade-in">
       <div className="flex gap-12 text-sm italic items-center">
          <div className="flex items-center gap-2">
            <span>Month Wage:</span>
            <input 
              disabled={!isEditing}
              type="number"
              value={wage}
              onChange={(e) => onUpdate(Number(e.target.value))}
              className={`font-bold border-b text-center outline-none ${isEditing ? 'border-rose-400 bg-rose-50 w-24' : 'border-slate-300 w-20'}`}
            />
            <span>/ Month</span>
          </div>
          <p>Yearly Wage: <span className="font-bold border-b border-slate-300 px-4">₹{wage * 12}</span> / Yearly</p>
       </div>

       <div className="grid grid-cols-2 gap-16">
          <div className="space-y-6">
             <h4 className="font-bold text-slate-800 text-sm border-b pb-2 flex justify-between">
                Salary Components
                <span className="text-[9px] text-slate-400 font-normal uppercase italic underline">Auto-Calculated</span>
             </h4>
             <SalaryRow label="Basic Salary" value={basic} percent="50.00 % of Wage" />
             <SalaryRow label="House Rent Allowance" value={hra} percent="50.00 % of Basic" />
             <SalaryRow label="Standard Allowance" value="4167" />
          </div>
          <div className="space-y-6">
             <h4 className="font-bold text-slate-800 text-sm border-b pb-2">Deductions</h4>
             <SalaryRow label="Provident Fund (PF)" value="3000" isRed />
             <SalaryRow label="Professional Tax" value="200" isRed />
          </div>
       </div>
       
       <div className="bg-slate-50 p-6 rounded-lg border border-dashed border-slate-200 mt-10">
          <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-bold tracking-widest">
            Important Note: Wage components are calculated based on company policy. 
            Modifying the monthly wage will automatically update Basic and HRA values.
          </p>
       </div>
    </div>
  );
}

function SalaryRow({ label, value, percent, isRed }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-100 group hover:bg-slate-50 transition-colors px-1">
      <div className="flex flex-col">
        <span className="text-[11px] text-slate-600 font-bold">{label}</span>
        {percent && <span className="text-[9px] text-slate-400 font-bold uppercase italic tracking-tighter">{percent} v</span>}
      </div>
      <span className={`font-mono text-sm font-black ${isRed ? 'text-rose-500' : 'text-slate-900'}`}>
        {isRed ? '-' : ''}₹{value}
      </span>
    </div>
  );
}