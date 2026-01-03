import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Upload, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { signUpSchema } from './authSchema';
import { db } from '../../api/db';

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { role: 'employee' }
  });

  const fullName = watch("fullName", "");

  // Logic for Automated ID Generation based on your requirements
  const generateID = (name) => {
    if (!name) return "OI----20260001";
    const parts = name.trim().split(' ');
    const first = parts[0]?.slice(0, 2) || "XX";
    const last = (parts[1] || parts[0]).slice(0, 2);
    const initials = (first + last).toUpperCase();
    return `OI${initials}20260001`; 
  };

  const onSubmit = async (data) => {
    try {
      // Check if email already exists
      const existingUser = await db.users.where("email").equals(data.email).first();
      if (existingUser) {
        alert("This email is already registered.");
        return;
      }

      // Add user to Dexie DB
      await db.users.add({
        ...data,
        status: 'absent',
        createdAt: new Date().toISOString()
      });

      alert(`Registration Successful! \nYour System Login ID is: ${data.employeeId}`);
      navigate('/login');
    } catch (err) {
      console.error("Registration error:", err);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-xl font-bold text-slate-500 mb-6 italic">Human Resource Management System</h1>
      
      <div className="bg-white border border-slate-200 p-10 rounded-sm shadow-sm w-full max-w-lg">
        <h2 className="text-center text-slate-400 font-bold mb-8 italic text-sm underline decoration-slate-200">Sign Up Page</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Role Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck size={10}/> Authority Level
            </label>
            <select 
              {...register("role")}
              className="w-full border-b border-slate-300 py-2 outline-none text-sm italic bg-transparent focus:border-rose-400"
            >
              <option value="employee">Employee (Standard Access)</option>
              <option value="admin">HR Officer / Admin (Full Access)</option>
            </select>
          </div>

          <div className="relative">
            <input type="text" placeholder="Company Name" className="w-full border-b border-slate-300 py-2 outline-none text-sm italic" />
            <button type="button" className="absolute right-0 top-2 text-blue-500"><Upload size={18} /></button>
          </div>
          
          <div>
            <input 
              {...register("fullName")}
              type="text" 
              placeholder="Full Name" 
              className="w-full border-b border-slate-300 py-2 outline-none text-sm italic" 
            />
            {errors.fullName && <p className="text-red-500 text-[10px] mt-1">{errors.fullName.message}</p>}
          </div>
          
          {/* Automated ID Field - Matches Generated ID */}
          <div>
            <label className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">System Login ID</label>
            <input 
              {...register("employeeId")}
              type="text"
              placeholder={generateID(fullName)}
              className="w-full border-b border-blue-200 py-1 outline-none text-sm font-bold text-blue-600 bg-blue-50/30"
            />
            {errors.employeeId && <p className="text-red-500 text-[10px] mt-1">{errors.employeeId.message}</p>}
          </div>

          <div>
            <input {...register("email")} type="email" placeholder="Email Address" className="w-full border-b border-slate-300 py-2 outline-none text-sm italic" />
            {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
          </div>
          
          <div className="relative">
            <input 
              {...register("password")}
              type={showPass ? "text" : "password"} 
              placeholder="Set Password" 
              className="w-full border-b border-slate-300 py-2 outline-none text-sm italic" 
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-0 top-2 text-slate-400">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            {errors.password && <p className="text-red-500 text-[10px] mt-1">{errors.password.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-rose-400 text-white font-bold py-3 mt-4 rounded-sm shadow-lg shadow-rose-100 hover:bg-rose-500 transition-all uppercase tracking-widest text-[10px] disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
          
          <p className="text-center text-[10px] text-slate-400 mt-4 italic">
            Already registered? <span onClick={() => navigate('/login')} className="text-rose-400 cursor-pointer font-bold">Sign In</span>
          </p>
        </form>
      </div>
    </div>
  );
}