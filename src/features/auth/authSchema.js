import { z } from 'zod';

// 1. Sign Up Schema
export const signUpSchema = z.object({
  employeeId: z
    .string()
    .min(3, "ID must be at least 3 characters")
    .regex(/^[A-Z0-9]+$/, "ID must be alphanumeric (e.g., EMP001)"),
  
  fullName: z.string().min(2, "Full name is required"),
  
  email: z.string().email("Invalid email address"),
  
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  
  role: z.enum(["admin", "employee"], {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
});

// 2. Login Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// 3. Leave Request Schema
export const leaveSchema = z.object({
  leaveType: z.enum(["Paid", "Sick", "Unpaid"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  remarks: z.string().optional(),
}).refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return end >= start;
}, {
  message: "End date cannot be before the start date",
  path: ["endDate"],
});