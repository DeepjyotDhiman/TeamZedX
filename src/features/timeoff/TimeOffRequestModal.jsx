import React, { useState } from 'react';
import { db } from '../../api/db';
import { X } from 'lucide-react';

export default function TimeOffRequestModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ type: 'Paid time off', start: '', end: '' });
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Logic to actually save to your Dexie database
      await db.leave.add({
        employeeId: user.employeeId,
        employeeName: user.fullName,
        leaveType: formData.type,
        startDate: formData.start,
        endDate: formData.end,
        status: 'Pending'
      });
      alert("Leave Request Submitted!");
      onClose();
    } catch (err) {
      alert("Error submitting: " + err);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden border">
        <div className="px-10 py-5 flex justify-between border-b">
          <h3 className="text-rose-400 font-bold italic">Time off Request</h3>
          <button type="button" onClick={onClose}><X size={20}/></button>
        </div>
        <div className="p-10 space-y-6">
          <select 
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full border-b py-2 text-sm italic outline-none">
            <option>Paid time off</option>
            <option>Sick time off</option>
          </select>
          <input required type="date" onChange={(e) => setFormData({...formData, start: e.target.value})} className="w-full border-b py-2 outline-none" />
          <input required type="date" onChange={(e) => setFormData({...formData, end: e.target.value})} className="w-full border-b py-2 outline-none" />
          
          <div className="flex gap-4 pt-4">
            <button type="submit" className="bg-rose-400 text-white px-10 py-2 rounded-sm text-[10px] font-bold uppercase shadow-lg">Submit</button>
            <button type="button" onClick={onClose} className="border px-10 py-2 text-[10px] text-slate-400 font-bold uppercase">Discard</button>
          </div>
        </div>
      </form>
    </div>
  );
}