import { z } from "zod";
import { IMAGE_UPLOAD_MIME_TYPES } from "~/constants";
import { fileTypeFromBuffer } from "file-type";

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

export const enforceFileValidator = async (file: unknown) => {
  const parsed = fileValidator.safeParse(file);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      name: "ValidationError",
      message: parsed.error.issues[0].message,
      statusMessage: "Bad Request",
    });
  }

  const fileType = await fileTypeFromBuffer(parsed.data.data);
  if (!fileType) {
    throw createError({
      statusCode: 400,
      name: "ValidationError",
      message: "Invalid file type. Expected a valid image file.",
      statusMessage: "Bad Request",
    });
  }

  if (fileType.mime !== parsed.data.type) {
    throw createError({
      statusCode: 400,
      name: "ValidationError",
      message: `Invalid file type. Expected ${parsed.data.type} but got ${fileType}`,
      statusMessage: "Bad Request",
    });
  }

  return parsed.data;
};
