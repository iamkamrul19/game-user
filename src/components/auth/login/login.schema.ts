import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ message: "email is required" }).email("Invalid email"),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be 6 characters long"),
});
