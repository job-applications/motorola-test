import { z } from "zod";

export const usernameValidator = z
  .string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  })
  .trim()
  .max(20, { message: "Username must be at least 20 characters long" })
  .min(3, { message: "Username must be at least 3 characters long" });
