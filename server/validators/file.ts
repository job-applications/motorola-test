import { z } from "zod";
import { IMAGE_UPLOAD_MIME_TYPES } from "~/constants";

const invalidTypeError = IMAGE_UPLOAD_MIME_TYPES.join(", ");

const fileType = z
  .string()
  .refine(
    (type) => IMAGE_UPLOAD_MIME_TYPES.includes(type),
    `Invalid file type. Accepted types are: ${invalidTypeError}`,
  );

export const fileValidator = z.object({
  name: z.string(),
  filename: z.string(),
  type: fileType,
  data: z.instanceof(Buffer, {
    message: "Invalid file data. Expected a Buffer.",
  }),
});

export const enforceFileValidator = (file: unknown) => {
  const parsed = fileValidator.safeParse(file);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      name: "ValidationError",
      message: parsed.error.issues[0].message,
      statusMessage: "Bad Request",
    });
  }

  return parsed.data;
};
