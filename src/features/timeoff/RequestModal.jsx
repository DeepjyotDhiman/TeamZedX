import React from 'react';
import { Upload, X } from 'lucide-react';

export default function RequestModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden border">
        {/* Header */}
        <div className="px-8 py-4 bg-white flex justify-between items-center border-b">
          <h3 className="text-rose-400 font-bold italic">Time off Type Request</h3>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-600"><X size={20}/></button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <span className="text-slate-400">Employee</span>
            <span className="text-blue-500 font-bold">[Employee]</span>

            <span className="text-slate-400">Time off Type</span>
            <span className="text-blue-500 font-bold">[Paid time off]</span>

            <span className="text-slate-400">Validity Period</span>
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-bold">May 13</span>
              <span className="text-slate-300">To</span>
              <span className="text-blue-500 font-bold">May 14</span>
            </div>

            <span className="text-slate-400">Allocation</span>
            <div className="flex gap-2 font-bold italic">
               <span className="text-blue-500">01.00</span>
               <span className="text-slate-400">Days</span>
            </div>

            {/* Attachment for Sick Leave */}
            <span className="text-slate-400">Attachment</span>
            <div className="flex items-center gap-2">
              <button className="bg-blue-600 p-2 rounded text-white"><Upload size={14}/></button>
              <span className="text-slate-400 text-[10px]">(For sick leave certificate)</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button className="bg-rose-400 text-white px-8 py-1.5 rounded text-[10px] font-bold uppercase shadow-lg shadow-rose-100">Submit</button>
            <button onClick={onClose} className="border border-slate-200 px-8 py-1.5 rounded text-[10px] font-bold uppercase text-slate-400 hover:bg-slate-50">Discard</button>
          </div>
        </div>
      </div>
    </div>
  );
}