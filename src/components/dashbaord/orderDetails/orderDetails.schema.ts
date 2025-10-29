import z from "zod";

export const otpSchema = z.object({
  module: z.string(),
  view_id: z.string(),
  otp: z
    .string({ message: "OTP must be 6 numeric digits" })
    .length(6, { message: "OTP must be 6 numeric digits" })
    .regex(/^\d{6}$/, "OTP must be 6 numeric digits"),
});
