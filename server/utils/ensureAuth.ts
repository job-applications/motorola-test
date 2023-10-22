export default function ensureAuth(context: any) {
  if (context?.auth?.user) {
    return context.auth.user;
  }

  throw createError({
    statusCode: 403,
    name: "ForbiddenError",
    message: "Forbidden",
    statusMessage: "Forbidden",
  });
}
