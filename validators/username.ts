import { z } from "zod";

export const usernameValidator = z
  .string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  })
  .trim()
  .min(1, { message: "Username is required" })
  .min(3, { message: "Username must be at least 3 characters long" })
  .max(20, { message: "Username must be at most 20 characters long" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username must only contain letters, numbers, and underscores",
  });
