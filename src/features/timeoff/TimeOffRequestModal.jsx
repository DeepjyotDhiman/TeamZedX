import React from 'react';
import { Upload, X } from 'lucide-react';

export default function TimeOffRequestModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-10 py-5 flex justify-between items-center border-b border-slate-100">
          <h3 className="text-rose-400 font-bold italic text-sm">Time off Type Request</h3>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-500"><X size={20}/></button>
        </div>

        <div className="p-10 space-y-8">
          <div className="grid grid-cols-2 gap-y-6 text-[11px]">
            <span className="text-slate-400 font-bold uppercase">Employee</span>
            <span className="text-blue-500 font-bold italic">[Employee]</span>

            <span className="text-slate-400 font-bold uppercase">Time off Type</span>
            <span className="text-blue-500 font-bold italic">[Paid time off]</span>

            <span className="text-slate-400 font-bold uppercase">Validity Period</span>
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-bold italic">May 13</span>
              <span className="text-slate-300 font-bold italic">To</span>
              <span className="text-blue-500 font-bold italic">May 14</span>
            </div>

            <span className="text-slate-400 font-bold uppercase">Allocation</span>
            <div className="flex gap-1 font-black italic">
               <span className="text-blue-500">01.00</span>
               <span className="text-slate-400">Days</span>
            </div>

            {/* Attachment Button for Sick Leave */}
            <span className="text-slate-400 font-bold uppercase">Attachment</span>
            <div className="flex items-center gap-3">
              <button className="bg-blue-600 p-2 rounded text-white shadow-md shadow-blue-100">
                <Upload size={14}/>
              </button>
              <span className="text-slate-400 text-[9px] italic font-bold">
                (For sick leave certificate)
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button className="bg-rose-400 text-white px-10 py-2 rounded-sm text-[10px] font-bold uppercase shadow-lg shadow-rose-100 hover:bg-rose-500 transition-all">
              Submit
            </button>
            <button 
              onClick={onClose} 
              className="border border-slate-200 px-10 py-2 rounded-sm text-[10px] font-bold uppercase text-slate-400 hover:bg-slate-50 transition-all"
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}