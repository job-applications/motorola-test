import { z } from "zod";

export const noteValidator = z
  .string({
    required_error: "Note is required",
    invalid_type_error: "Note must be a string",
  })
  .trim()
  .min(1, "Note is required")
  .max(1000, "Note must be at most 1000 characters long");
