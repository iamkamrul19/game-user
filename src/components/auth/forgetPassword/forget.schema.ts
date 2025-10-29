import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z.string({ message: "email is required" }).email("Invalid email"),
});
