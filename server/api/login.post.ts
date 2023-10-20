import { findUser } from "../services/user";
import { getUserAccessToken } from "../services/auth";
import { usernameValidator } from "../validators/username";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const username = usernameValidator.safeParse(body.username);

  if (!username.success) {
    throw createError({
      statusCode: 400,
      name: "ValidationError",
      message: username.error.issues[0].message,
      statusMessage: "Bad Request",
    });
  }

  const user = findUser(username.data);

  if (!user) {
    throw createError({
      statusCode: 404,
      name: "NotFoundError",
      message: "User not found",
      statusMessage: "Not Found",
    });
  }

  const token = getUserAccessToken(user);
  return { token, user };
});
