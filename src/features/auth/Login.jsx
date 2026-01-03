import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from './authSchema';
import { db } from '../../api/db';

export default function Login() {
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      const user = await db.users.where("email").equals(data.email).first();

      if (user && user.password === data.password) {
        // Save current session
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred during sign-in.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-xl font-bold text-slate-500 mb-10 italic">Human Resource Management System</h1>
      
      <div className="bg-white border border-slate-200 p-10 rounded-sm shadow-sm w-full max-w-sm">
        <h2 className="text-center text-slate-400 font-bold mb-8 italic text-sm underline decoration-slate-100">Sign in Page</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
          <div className="group">
            <label className="text-[10px] text-slate-400 font-bold uppercase">Email Address</label>
            <input 
              {...register("email")}
              type="email" 
              placeholder="you@company.com"
              className="w-full border-b border-slate-300 py-1 outline-none text-sm italic focus:border-rose-300 transition-colors" 
            />
            {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
          </div>
          
          <div className="group">
            <label className="text-[10px] text-slate-400 font-bold uppercase">Password</label>
            <input 
              {...register("password")}
              type="password" 
              placeholder="••••••••"
              className="w-full border-b border-slate-300 py-1 outline-none text-sm italic focus:border-rose-300 transition-colors" 
            />
            {errors.password && <p className="text-red-500 text-[10px] mt-1">{errors.password.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-rose-400 text-white font-bold py-2 mt-4 rounded-sm uppercase tracking-widest text-[10px] shadow-lg shadow-rose-100 hover:bg-rose-500 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
          
          <div className="flex justify-between mt-6 text-[10px] italic">
             <span onClick={() => navigate('/register')} className="text-rose-400 cursor-pointer font-bold underline">Create New Account</span>
             <span className="text-slate-300 cursor-not-allowed">Forgot Password?</span>
          </div>
        </form>
      </div>
      
      <p className="mt-10 text-[9px] text-slate-300 font-bold uppercase tracking-widest">© 2026 Dayflow HR Solutions</p>
    </div>
  );
}