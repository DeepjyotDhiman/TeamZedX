import React, { useState, useEffect } from 'react';
import { db } from '../../api/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Play, Square } from 'lucide-react';

export default function AttendanceToggle({ employeeId }) {
  // Get today's date string (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  // Real-time query to see if the user has already checked in today
  const attendanceRecord = useLiveQuery(
    () => db.attendance
      .where('[employeeId+date]')
      .equals([employeeId, today])
      .first()
  );

  const handleCheckIn = async () => {
    const now = new Date();
    await db.attendance.add({
      employeeId,
      date: today,
      checkIn: now.toLocaleTimeString(),
      checkOut: null,
      status: 'Present' // Requirement [cite: 71]
    });
  };

  const handleCheckOut = async () => {
    if (!attendanceRecord) return;
    const now = new Date();
    await db.attendance.update(attendanceRecord.id, {
      checkOut: now.toLocaleTimeString()
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Daily Attendance</h3>
      
      {!attendanceRecord ? (
        <button 
          onClick={handleCheckIn}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
        >
          <Play size={20} fill="currentColor" />
          Check In
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-8 text-sm">
            <div>
              <p className="text-slate-500">Check In Time</p>
              <p className="font-mono font-bold text-slate-800">{attendanceRecord.checkIn}</p>
            </div>
            <div>
              <p className="text-slate-500">Status</p>
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold uppercase">
                {attendanceRecord.status}
              </span>
            </div>
          </div>

          {!attendanceRecord.checkOut ? (
            <button 
              onClick={handleCheckOut}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-bold transition-all"
            >
              <Square size={20} fill="currentColor" />
              Check Out
            </button>
          ) : (
            <div>
              <p className="text-slate-500 text-sm">Check Out Time</p>
              <p className="font-mono font-bold text-slate-800">{attendanceRecord.checkOut}</p>
              <p className="text-emerald-600 text-sm font-medium mt-2">Workday Completed!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}