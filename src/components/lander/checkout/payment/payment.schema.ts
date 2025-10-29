import z from "zod";

export const paymentSchema = z.object({
  address: z.string().min(2, "At least 2 characters is required"),
  country: z.string().min(2, "At least 2 characters is required"),
  full_name: z.string().min(2, "At least 2 characters is required"),
  phone_number: z.string().nonempty(),
  payment_method_id: z.string({ message: "Payment method is required" }),
});
