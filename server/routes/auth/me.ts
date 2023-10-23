import { findUser } from "~/server/services/user";

export default defineEventHandler(async (event) => {
  const auth = ensureAuth(event.context);
  const user = findUser(auth.id);

  if (!user) {
    throw createError({
      statusCode: 404,
      name: "NotFoundError",
      message: "User not found",
      statusMessage: "Not Found",
    });
  }

  return {
    statusCode: 200,
    message: "User is logged in",
    data: user,
  };
});
