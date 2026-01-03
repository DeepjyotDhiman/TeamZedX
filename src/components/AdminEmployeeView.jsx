function AdminEmployeeView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-800 italic">Staff Directory</h3>
          <p className="text-xs text-slate-400 font-medium">Manage employee profiles and system access</p>
        </div>
        <button className="bg-rose-400 text-white text-[10px] font-bold px-6 py-2 rounded uppercase shadow-lg shadow-rose-100 hover:bg-rose-500 transition-all">
          + Add New Staff
        </button>
      </div>

      {/* Reusing the Grid with Admin privileges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <EmployeeManagementCard name="Priyank Garala" id="OIPR20260001" status="present" />
        <EmployeeManagementCard name="Luminous Raven" id="OILS20260002" status="leave" />
      </div>
    </div>
  );
}

function EmployeeManagementCard({ name, id, status }) {
  return (
    <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-rose-200 transition-all cursor-pointer group shadow-sm">
       <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-slate-300">👤</div>
          {/* Status Indicator logic */}
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded text-[8px] font-bold uppercase">
             <div className={`w-2 h-2 rounded-full ${status === 'present' ? 'bg-emerald-500' : 'bg-yellow-400'}`} />
             {status}
          </div>
       </div>
       <h4 className="font-bold text-slate-800 text-sm italic">[{name}]</h4>
       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{id}</p>
       
       <div className="mt-4 pt-4 border-t border-slate-50 flex gap-2">
          <button className="text-[9px] font-bold text-blue-500 uppercase hover:underline">View Profile</button>
          <button className="text-[9px] font-bold text-rose-400 uppercase hover:underline">Edit Payroll</button>
       </div>
    </div>
  );
}