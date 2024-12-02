import { z } from "zod";

export const orderSchema = z.object({
  customer_name: z.string().min(1, "Customer name is required"),
  assigned_truck: z.string().default("null"),
  assigned_driver: z.string().default("null"),
  order_status: z.enum(["pending", "complete"]),
});
