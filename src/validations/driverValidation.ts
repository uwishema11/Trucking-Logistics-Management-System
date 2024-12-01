import { z } from "zod";

export const driverSchema = z.object({
  name: z.string().min(1, "driver's name is required"),
  license_number: z
    .string()
    .min(
      6,
      "license number is required and must be at least 6 characters long"
    ),
  assigned_truck: z.string().default("null"),
  contact_number: z.string().min(10, "Contact number is required"),
  status: z.enum(["Available", "Delivering"]),
});
