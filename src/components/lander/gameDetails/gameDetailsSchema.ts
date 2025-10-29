import z from "zod";

export const addToCart = z.object({
  type: z.string(),
  value: z
    .string({ message: "Value is required" })
    .nonempty({ message: "Value is required" }),
  title: z.string().optional(),
  content: z.string().optional(),
  options: z.array(z.string()).optional(),
});

export const addToCartSchema = z.object({
  fields: z.array(addToCart),
});
