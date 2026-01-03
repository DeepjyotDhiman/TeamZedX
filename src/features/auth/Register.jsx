import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from './authSchema';
import { db } from '../../api/db';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = async (data) => {
    try {
      // 1. Check if Employee ID or Email is already taken
      const idExists = await db.users.where("employeeId").equals(data.employeeId).first();
      const emailExists = await db.users.where("email").equals(data.email).first();

      if (idExists) return alert("Employee ID already exists.");
      if (emailExists) return alert("Email already registered.");

      // 2. Add user to Dexie DB
      await db.users.add(data);
      alert("Registration Successful! You can now log in.");
      navigate('/login');
    } catch (err) {
      alert("Error saving user to database.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4 border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Full Name</label>
          <input {...register("fullName")} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Employee ID</label>
          <input {...register("employeeId")} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="EMP001" />
          {errors.employeeId && <p className="text-red-500 text-xs">{errors.employeeId.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input {...register("email")} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="name@company.com" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input type="password" {...register("password")} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Role</label>
          <select {...register("role")} className="w-full p-2 border rounded-md bg-white">
            <option value="employee">Employee</option>
            <option value="admin">HR / Admin</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200">
          Sign Up
        </button>
      </form>
    </div>
  );
}