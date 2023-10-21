import { usernameValidator } from "~/validators/username";

export const enforceUsernameValidator = (username: unknown) => {
  const parsed = usernameValidator.safeParse(username);

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
