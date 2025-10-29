import { z } from "zod";
const bdPhoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;
const uppercaseRegex = /[A-Z]/;

export const registerSchema = z
  .object({
    full_name: z.string({ message: "email is required" }).min(2),
    email: z.string({ message: "email is required" }).email("Invalid email"),
    birth_date: z.string({ message: "Birth date is required" }),
    phone_number: z.string().regex(bdPhoneRegex, {
      message: "Invalid Bangladeshi phone number",
    }),
    password: z
      .string({ message: "Password is required" })
      .min(8, "Password must be 6 characters long")
      .regex(uppercaseRegex, {
        message: "Password must contain at least one uppercase letter",
      }),
    confirm_password: z
      .string({ message: "Password is required" })
      .min(8, "Password must be 6 characters long")
      .regex(uppercaseRegex, {
        message: "Password must contain at least one uppercase letter",
      }),
    user_ip: z.string().optional(),
    country: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirm_password;
    },
    {
      message: "Password doesn't match",
      path: ["password"],
    }
  );
