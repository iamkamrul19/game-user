import z from "zod";

export const purchaseReportSchema = z.object({
  problem_type: z.string(),
  refund_in: z.string(),
  attachments: z.array(z.string()),
  message: z.string(),
});
