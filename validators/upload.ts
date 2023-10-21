import { z } from "zod";

export const loginPostValidator = z.object({
  note: z
    .string()
    .min(1, "Note is required")
    .max(1000, "Note must be at most 1000 characters long"),
  file: z.string().min(1, "File is required"),
});
