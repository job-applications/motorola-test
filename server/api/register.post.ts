import { createUser, findUser } from "../services/user";
import { getUserAccessToken } from "../services/auth";
import { enforceUsernameValidator } from "../validators/username";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const username = enforceUsernameValidator(body.username);
  const user = findUser(username);

  if (user) {
    throw createError({
      statusCode: 409,
      message: "Account already exists",
    });
  }

  const newUser = createUser(username);
  const token = getUserAccessToken(newUser);

  return { token, user };
});
