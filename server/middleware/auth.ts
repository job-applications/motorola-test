import { verifyUserAccessToken } from "../services/auth";
import { findUser } from "../services/user";

export default defineEventHandler((event) => {
  const cookies = parseCookies(event);
  if (cookies.__session) {
    const token = cookies.__session;

    const content = verifyUserAccessToken(token);
    if (content.id) {
      const user = findUser(content.id);

      if (user) {
        console.info("Authenticated user: '%s'", user.id);
        event.context.auth = { user };
      }
    }
  }
});
