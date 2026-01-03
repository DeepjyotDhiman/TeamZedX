import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from './authSchema';
import { db } from '../../api/db';

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { role: 'employee' }
  });

  const fullName = watch("fullName", "");
  const generateID = (name) => {
    if (!name) return "OI----20260001";
    const parts = name.trim().split(' ');
    const initials = (parts[0]?.slice(0, 2) + (parts[1]?.slice(0, 2) || "XX")).toUpperCase();
    return `OI${initials}20260001`; 
  };

  const onSubmit = async (data) => {
    try {
      await db.users.add({ ...data, status: 'absent', createdAt: new Date().toISOString() });
      alert(`Success! ID Created: ${data.employeeId}`);
      navigate('/login');
    } catch (err) { alert("Registration failed."); }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* FORM CONTENT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white shadow-2xl z-10">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-6 h-6 bg-slate-900 rounded"></div>
            <span className="font-black italic text-slate-900 tracking-tighter">System/Init</span>
          </div>

          <h2 className="text-5xl font-black text-slate-900 italic tracking-tighter mb-8">Identity Setup.</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-10">
               <div className="space-y-1">
                 <label className="text-[10px] text-slate-400 font-black uppercase">System Role</label>
                 <select {...register("role")} className="w-full border-b-2 border-slate-100 py-3 outline-none text-sm font-bold italic bg-transparent focus:border-rose-500">
                    <option value="employee">Standard Employee</option>
                    <option value="admin">System Administrator</option>
                 </select>
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] text-rose-500 font-black uppercase">Generated ID</label>
                 <input {...register("employeeId")} value={generateID(fullName)} className="w-full border-b-2 border-rose-100 py-3 outline-none text-sm font-black text-rose-500 bg-rose-50/50 px-2" />
               </div>
            </div>

            <div className="space-y-1">
               <label className="text-[10px] text-slate-400 font-black uppercase">Official Name</label>
               <input {...register("fullName")} placeholder="John Doe" className="w-full border-b-2 border-slate-100 py-3 outline-none text-sm font-bold italic focus:border-rose-500" />
            </div>

            <div className="space-y-1">
               <label className="text-[10px] text-slate-400 font-black uppercase">System Email</label>
               <input {...register("email")} placeholder="name@dayflow.sys" className="w-full border-b-2 border-slate-100 py-3 outline-none text-sm font-bold italic focus:border-rose-500" />
            </div>

            <div className="space-y-1">
               <label className="text-[10px] text-slate-400 font-black uppercase">Create Key</label>
               <input {...register("password")} type="password" placeholder="••••••••" className="w-full border-b-2 border-slate-100 py-3 outline-none text-sm font-bold italic focus:border-rose-500" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-rose-500 text-white font-black py-5 mt-6 rounded-sm shadow-xl shadow-rose-200 hover:bg-slate-900 transition-all uppercase text-[11px] tracking-widest">
              Deploy Identity
            </button>
          </form>
          <p onClick={() => navigate('/login')} className="text-center text-[10px] text-slate-400 mt-8 font-bold uppercase tracking-widest cursor-pointer hover:text-rose-500">
            Already Registered? <span className="underline ml-1 text-slate-900">Sign In</span>
          </p>
        </div>
      </div>

      {/* FEATURE SHOWCASE SIDEBAR */}
      <div className="hidden lg:flex lg:w-1/2 bg-rose-500 flex-col justify-center p-24 text-white relative">
        <div className="space-y-12 relative z-10">
          <h3 className="text-6xl font-black italic leading-none mb-10">THE <br />ENTERPRISE <br />GRID.</h3>
          
          <div className="grid gap-6">
            <FeatureBox title="RBAC Architecture" desc="Role Based Access Control for secure data siloing." />
            <FeatureBox title="Real-Time Sync" desc="Live database hooks via Dexie for zero-latency updates." />
            <FeatureBox title="Automated Payroll" desc="Dynamic HRA/Basic derivation based on core wages." />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureBox({ title, desc }) {
  return (
    <div className="border-l-4 border-white pl-6 py-2 bg-white/5 backdrop-blur-sm rounded-r-xl">
      <p className="font-black italic text-lg">{title}</p>
      <p className="text-sm font-medium text-rose-100 opacity-80">{desc}</p>
    </div>
  );
}