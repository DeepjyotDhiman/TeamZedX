import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from './authSchema';
import { db } from '../../api/db';

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { role: 'employee', employeeId: '' }
  });

  const fullName = watch("fullName", "");

  // IMPROVED ID GENERATOR: Adds a random suffix to prevent "ID Already Exists" errors
  const generateID = (name) => {
    if (!name || name.length < 2) return "OI----20260001";
    const parts = name.trim().split(' ');
    const initials = (parts[0]?.slice(0, 2) + (parts[1]?.slice(0, 2) || "XX")).toUpperCase();
    // Unique suffix based on current seconds to prevent collisions
    const uniqueTag = new Date().getSeconds().toString().padStart(2, '0');
    return `OI${initials}26${uniqueTag}`; 
  };

  useEffect(() => {
    const newId = generateID(fullName);
    setValue("employeeId", newId, { shouldValidate: true });
  }, [fullName, setValue]);

  const onSubmit = async (data) => {
    try {
      // 1. Check for duplicates before attempting insert
      const idExists = await db.users.where("employeeId").equals(data.employeeId).first();
      const emailExists = await db.users.where("email").equals(data.email).first();

      if (idExists || emailExists) {
        alert("Registration Blocked: Identity or Email already exists in the local database.");
        return;
      }

      // 2. Add to DB with the 'status' field required by our new schema
      await db.users.add({ 
        ...data, 
        status: 'absent', 
        createdAt: new Date().toISOString() 
      });
      
      alert(`Identity Secured! Login with ID: ${data.employeeId}`);
      navigate('/login');
    } catch (err) { 
      console.error("Dexie Error:", err);
      alert("Registration failed: Schema mismatch or database lock. Try a Hard Reset."); 
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white shadow-2xl z-10">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-6 h-6 bg-slate-900 rounded"></div>
            <span className="font-black italic text-slate-900 tracking-tighter uppercase tracking-widest">System/Init</span>
          </div>

          <h2 className="text-5xl font-black text-slate-900 italic tracking-tighter mb-8 leading-none">Identity Setup.</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-10">
               <div className="space-y-1">
                 <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest">System Role</label>
                 <select {...register("role")} className="w-full border-b-2 border-slate-100 py-3 outline-none text-sm font-bold italic bg-transparent focus:border-rose-500">
                    <option value="employee">Standard Employee</option>
                    <option value="admin">System Administrator</option>
                 </select>
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] text-rose-500 font-black uppercase tracking-widest">Generated ID</label>
                 <input 
                    {...register("employeeId")} 
                    readOnly 
                    className="w-full border-b-2 border-rose-100 py-3 outline-none text-sm font-black text-rose-500 bg-rose-50/50 px-2 italic" 
                 />
               </div>
            </div>

            <div className="space-y-1">
               <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Official Full Name</label>
               <input {...register("fullName")} placeholder="John Doe" className="w-full border-b-2 border-slate-100 py-3 outline-none text-sm font-bold italic focus:border-rose-500" />
               {errors.fullName && <p className="text-[9px] text-rose-500 font-bold">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-1">
               <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Corporate Email</label>
               <input {...register("email")} placeholder="name@dayflow.sys" className="w-full border-b-2 border-slate-100 py-3 outline-none text-sm font-bold italic focus:border-rose-500" />
               {errors.email && <p className="text-[9px] text-rose-500 font-bold">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
               <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Security Key (Password)</label>
               <input {...register("password")} type="password" placeholder="••••••••" className="w-full border-b-2 border-slate-100 py-3 outline-none text-sm font-bold italic focus:border-rose-500" />
               {errors.password && <p className="text-[9px] text-rose-500 font-bold">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-rose-500 text-white font-black py-5 mt-6 rounded-sm shadow-xl shadow-rose-200 hover:bg-slate-900 transition-all uppercase text-[11px] tracking-[0.2em]">
              {isSubmitting ? "Deploying..." : "Deploy Identity"}
            </button>
          </form>
          
          <p onClick={() => navigate('/login')} className="text-center text-[10px] text-slate-400 mt-8 font-black uppercase tracking-widest cursor-pointer hover:text-rose-500 transition-colors">
            Already Registered? <span className="underline ml-1 text-slate-900">Sign In Portal</span>
          </p>
        </div>
      </div>

      {/* FEATURE SHOWCASE */}
      <div className="hidden lg:flex lg:w-1/2 bg-rose-500 flex-col justify-center p-24 text-white relative">
        <div className="space-y-12 relative z-10">
          <h3 className="text-7xl font-black italic leading-[0.85] mb-10 tracking-tighter uppercase">The <br />Authority <br />Grid.</h3>
          <div className="grid gap-6">
            <FeatureBox title="Atomic RBAC" desc="Role-based permissions isolated at the database layer." />
            <FeatureBox title="Live Persistence" desc="Real-time IndexedDB synchronization with Dexie.js." />
            <FeatureBox title="Dynamic Payroll" desc="Automated tax and benefit derivation engine." />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureBox({ title, desc }) {
  return (
    <div className="border-l-4 border-white pl-6 py-2 bg-white/5 backdrop-blur-sm rounded-r-xl">
      <p className="font-black italic text-lg uppercase tracking-tight">{title}</p>
      <p className="text-sm font-medium text-rose-100 opacity-80">{desc}</p>
    </div>
  );
}