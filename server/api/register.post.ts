import { createUser, findUser } from "../services/user";
import { getUserAccessToken } from "../services/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = findUser(body.username);

  if (user) {
    throw createError({
      statusCode: 409,
      message: "Account already exists",
    });
  }

  const newUser = createUser(body.username);
  const token = getUserAccessToken(newUser);

  return { token, user };
});
