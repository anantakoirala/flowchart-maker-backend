import z from "zod";

export const fileSchema = z.object({
  title: z.string().min(3, "File name should be at least 3 characters"),
  teamId: z.string(),
});
