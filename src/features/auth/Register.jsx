import React, { useState } from 'react';
import { Upload, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");

  // Logic for Automated ID Generation
  const generateID = (fullName) => {
    const parts = fullName.trim().split(' ');
    const first = parts[0]?.slice(0, 2) || "XX";
    const last = (parts[1] || parts[0]).slice(0, 2);
    const initials = (first + last).toUpperCase();
    return `OI${initials}20260001`; // e.g., OIJODO20260001
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-xl font-bold text-slate-500 mb-10 italic">Human Resource Management System</h1>
      
      <div className="bg-white border border-slate-200 p-10 rounded-sm shadow-sm w-full max-w-lg">
        <h2 className="text-center text-slate-400 font-bold mb-8 italic text-sm underline decoration-slate-200">Sign Up Page</h2>
        
        <div className="space-y-6">
          <div className="relative">
             <input type="text" placeholder="Company Name" className="w-full border-b border-slate-300 py-2 outline-none text-sm italic" />
             <button className="absolute right-0 top-2 text-blue-500"><Upload size={18} /></button>
          </div>
          
          <input 
            type="text" 
            placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-b border-slate-300 py-2 outline-none text-sm italic" 
          />
          
          {/* Visual Feedback for Generated ID */}
          {name && (
            <div className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">
              Generated Login ID: {generateID(name)}
            </div>
          )}

          <input type="email" placeholder="Email" className="w-full border-b border-slate-300 py-2 outline-none text-sm italic" />
          
          <div className="relative">
            <input type={showPass ? "text" : "password"} placeholder="Password" className="w-full border-b border-slate-300 py-2 outline-none text-sm italic" />
            <button onClick={() => setShowPass(!showPass)} className="absolute right-0 top-2 text-slate-400">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-rose-400 text-white font-bold py-2 mt-4 rounded-sm shadow-lg shadow-rose-100 hover:bg-rose-500 transition-colors uppercase tracking-widest text-[10px]"
          >
            Sign Up
          </button>
          
          <p className="text-center text-[10px] text-slate-400 mt-4 italic">
            Already have an account? <span onClick={() => navigate('/login')} className="text-rose-400 cursor-pointer font-bold">Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
}