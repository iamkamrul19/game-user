import z from "zod";

export const reviewSchema = z.object({
  game_id: z.string("Game ID is required"),
  comment: z.string("Comment is required").min(2, "Atleast 2 characters long"),
  rating: z.string("Rating is required"),
});
