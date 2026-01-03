// Example: src/features/leave/leaveSchema.js
import { z } from "zod";

export const leaveSchema = z.object({
  type: z.enum(["Paid", "Sick", "Unpaid"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  remarks: z.string().max(200, "Remarks too long").optional(),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: "End date must be after start date",
  path: ["endDate"],
});