import { z } from "zod";

export const truckSchema = z.object({
  id: z
    .string()
    .min(3, { message: "trck id must be 3 or more characters long" }),
  status: z.enum(["Available", "Delivering"]),
  plate_number: z
    .string()
    .min(4, "Plate_number must be atleast 4 characters long"),
  capacity: z.number()
});
