import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './authSchema';
import { db } from '../../api/db';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      // Find the user by email in our local Dexie DB
      const user = await db.users.where("email").equals(data.email).first();

      // Simple password check (In a production app, passwords would be hashed)
      if (user && user.password === data.password) {
        // Save the current session to localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect based on role defined in the document 
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        // Display error for incorrect credentials 
        alert("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred during sign-in.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Dayflow</h1>
          <p className="text-slate-500 mt-2">Every workday, perfectly aligned. [cite: 2]</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <input 
              {...register("email")} 
              type="email"
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300 transition-all" 
              placeholder="you@company.com" 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <input 
              {...register("password")} 
              type="password" 
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300 transition-all" 
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-100"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Don't have an account?{" "}
          <button 
            onClick={() => navigate('/register')} 
            className="text-blue-600 font-semibold hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}