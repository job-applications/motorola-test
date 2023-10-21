import { findUser } from "../services/user";
import { getUserAccessToken } from "../services/auth";
import { enforceUsernameValidator } from "../validators/username";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const username = enforceUsernameValidator(body.username);
  const user = findUser(username);

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
