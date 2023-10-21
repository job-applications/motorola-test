import { noteValidator } from "~/validators/note";

export const enforceNoteValidator = (note: unknown) => {
  const parsed = noteValidator.safeParse(note);

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
