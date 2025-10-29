import { z } from "zod";

export const verifyEmailSchema = z.object({
  email: z.string({ message: "email is required" }).email("Invalid email"),
  otp: z
    .string({ message: "Otp is required" })
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});
