import z from "zod";

export const profileSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  profile_picture: z.string().optional(),
  phone_number: z
    .string()
    .trim()
    // strip spaces, dashes, parentheses
    .transform((s) => s.replace(/[\s()-]/g, ""))
    // validate structure
    .refine((s) => /^(?:\+?88)?01[3-9]\d{8}$/.test(s), {
      message: "Invalid Bangladesh mobile number",
    })
    // normalize to E.164
    .transform((s) => {
      const digits = s.replace(/\D/g, ""); // drop '+'
      const last10 = digits.slice(-10); // 1XXXXXXXXX
      return `+880${last10}`;
    }),
  birth_date: z.string(),
  nickname: z.string().optional(),
  country: z.string().optional(),
  social_links: z.object({
    facebook: z.url(),
    twitter: z.url(),
    instagram: z.url(),
    linkedin: z.string(),
  }),
});

export const changePasswordSchema = z.object({
  current_password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be 6 characters long"),
  new_password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be 6 characters long"),
  confirm_password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be 6 characters long"),
});

export const changeEmailSchema = z.object({
  current_email: z.email(),
  new_email: z.email(),
  confirm_new_email: z.email(),
});
