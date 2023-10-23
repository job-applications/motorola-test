import { createUser, findUser } from "../../services/user";
import { getUserAccessToken } from "../../services/auth";
import { enforceUsernameValidator } from "../../validators/username";
import { env } from "~/env";
import ms from "ms";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const username = enforceUsernameValidator(body.username);
  const existingUser = findUser(username);

  if (existingUser) {
    throw createError({
      statusCode: 409,
      message: "Account already exists",
    });
  }

  const user = createUser(username);
  const token = getUserAccessToken(user);

  setCookie(event, "__session", token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    expires: new Date(Date.now() + ms(env.JWT_TOKEN_EXPIRES_IN)),
  });

  return {
    statusCode: 200,
    message: "User registered successfully",
    data: user,
  };
});
