import { z } from "zod";

export const truckSchema = z.object({
  id: z.string(),
  plate_number: z
    .string()
    .min(1, "Plate Number is required")
    .regex(/^[A-Za-z0-9-]+$/, "Invalid Plate Number"),
  capacity: z.number().min(1, "Capacity must be greater than 0"),
  status: z.enum(["Available", "Delivering"]),
});
