import { createUser, findUser } from "../../services/user";
import { getUserAccessToken } from "../../services/auth";
import { enforceUsernameValidator } from "../../validators/username";
import { env } from "~/env";
import ms from "ms";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const username = enforceUsernameValidator(body.username);
  const user = findUser(username);

  if (!user) {
    createUser(username);
    throw createError({
      statusCode: 404,
      name: "NotFoundError",
      message: "User not found",
      statusMessage: "Not Found",
    });
  }

  const token = getUserAccessToken(user);

  setCookie(event, "__session", token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    expires: new Date(Date.now() + ms(env.JWT_TOKEN_EXPIRES_IN)),
  });

  return {
    statusCode: 200,
    message: "User logged in successfully",
    data: user,
  };
});
