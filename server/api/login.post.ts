import { findUser } from '../services/user';
import { getUserAccessToken } from '../services/auth';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = findUser(body.username);

  if (!user) {
    throw createError({
      statusCode: 404,
      name: 'NotFoundError',
      message: 'User not found',
      statusMessage: "Not Found",
    })
  }

  const token = getUserAccessToken(user);
  return { token };
});
