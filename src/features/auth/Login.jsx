import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './authSchema';
import { db } from '../../api/db';

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      const user = await db.users.where("email").equals(data.email).first();
      if (user && user.password === data.password) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate(user.role === 'admin' ? '/admin' : '/dashboard');
      } else { alert("Invalid credentials."); }
    } catch (err) { alert("Login error."); }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      {/* LEFT SIDE: Technical Branding Section */}
      <div className="hidden lg:flex lg:w-3/5 bg-[#0F172A] flex-col justify-center p-24 relative">
        {/* Animated Background Grid Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: `linear-gradient(#1E293B 1px, transparent 1px), linear-gradient(90deg, #1E293B 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }}></div>

        <div className="relative z-10">
          {/* CSS-Based Logo Replacement */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-rose-500 rounded-lg rotate-12 flex items-center justify-center shadow-lg shadow-rose-500/20">
               <div className="w-5 h-5 border-2 border-white rounded-sm"></div>
            </div>
            <span className="text-2xl font-black text-white tracking-tighter italic uppercase">Dayflow.</span>
          </div>

          <h1 className="text-7xl font-black text-white italic leading-[0.9] mb-8 tracking-tighter">
            THE FUTURE <br />
            <span className="text-rose-500">OF WORK</span> <br />
            IS ALIGNED.
          </h1>
          
          <div className="h-1 w-24 bg-rose-500 mb-8"></div>
          
          <p className="text-slate-400 text-xl max-w-sm italic font-medium leading-relaxed">
            A unified intelligence layer for your human resources. Automated, secure, and beautiful.
          </p>
        </div>

        {/* Footer info inside branding */}
        <div className="mt-auto relative z-10 flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
           <span>Core Engine v4.0</span>
           <span>IndexedDB Persistence</span>
        </div>
      </div>

      {/* RIGHT SIDE: Clean Portal Section */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-12 bg-slate-50">
        <div className="w-full max-w-sm">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter mb-2">Sign In.</h2>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Authorized Access Only</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="space-y-1 group">
              <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest group-focus-within:text-rose-500 transition-colors">Credential Email</label>
              <input 
                {...register("email")}
                placeholder="id@dayflow.sys"
                className="w-full border-b-2 border-slate-200 py-3 bg-transparent outline-none text-sm font-bold italic focus:border-rose-500 transition-all placeholder:text-slate-200" 
              />
              {errors.email && <p className="text-rose-500 text-[9px] font-black mt-1 italic uppercase">{errors.email.message}</p>}
            </div>
            
            <div className="space-y-1 group">
              <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest group-focus-within:text-rose-500 transition-colors">Secure Key</label>
              <input 
                {...register("password")}
                type="password" 
                placeholder="••••••••"
                className="w-full border-b-2 border-slate-200 py-3 bg-transparent outline-none text-sm font-bold italic focus:border-rose-400 transition-all placeholder:text-slate-200" 
              />
              {errors.password && <p className="text-rose-500 text-[9px] font-black mt-1 italic uppercase">{errors.password.message}</p>}
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white font-black py-5 rounded-sm shadow-2xl hover:bg-rose-500 transition-all uppercase tracking-widest text-[11px] active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Authenticating..." : "Connect to Server"}
            </button>
            
            <p className="text-center text-[10px] text-slate-400 italic">
              New Authority? <span onClick={() => navigate('/register')} className="text-rose-500 cursor-pointer font-black underline hover:text-slate-900">Request Identity</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}