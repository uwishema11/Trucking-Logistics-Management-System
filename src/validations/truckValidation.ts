import { z } from "zod";

export const truckSchema = z.object({
  status: z.enum(["Available", "Delivering"]),
  plate_number: z
    .string()
    .min(4, "Plate_number must be atleast 4 characters long"),
  capacity: z.number(),
});
