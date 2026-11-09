import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters"),

  hourly_rate: z.number().nonnegative("Hourly rate cannot be negative"),

  duration_minutes: z.number().int().min(15, "Duration must be at least 15 minutes"),

  coverage_radius_miles: z.number().int().positive("Coverage radius must be greater than 0"),
}).strict();

export type ServiceInput = z.infer<typeof serviceSchema>;