import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leaveSchema } from '../auth/authSchema';
import { db } from '../../api/db';

export default function LeaveRequestForm({ employeeId, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      status: 'Pending' // Default status as per requirements [cite: 85]
    }
  });

  const onSubmit = async (data) => {
    try {
      await db.leave.add({
        ...data,
        employeeId,
        status: 'Pending',
        createdAt: new Date().toISOString()
      });
      alert("Leave request submitted successfully!");
      reset();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Failed to submit leave:", err);
      alert("Error submitting request.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Apply for Leave</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Leave Type [cite: 81] */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
          <select 
            {...register("leaveType")}
            className="w-full p-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-purple-500 outline-none border-slate-300"
          >
            <option value="Paid">Paid Leave</option>
            <option value="Sick">Sick Leave</option>
            <option value="Unpaid">Unpaid Leave</option>
          </select>
          {errors.leaveType && <p className="text-red-500 text-xs mt-1">{errors.leaveType.message}</p>}
        </div>

        {/* Date Range [cite: 82] */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
            <input 
              type="date"
              {...register("startDate")}
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none border-slate-300"
            />
            {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
            <input 
              type="date"
              {...register("endDate")}
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none border-slate-300"
            />
            {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>}
          </div>
        </div>

        {/* Remarks [cite: 83] */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Remarks (Optional)</label>
          <textarea 
            {...register("remarks")}
            placeholder="Reason for leave..."
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none border-slate-300 h-24"
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-purple-100 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}