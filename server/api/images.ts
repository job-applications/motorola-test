import { getImages } from "../services/image";

export default defineEventHandler(async (event) => {
  const user = ensureAuth(event.context);

  return getImages(user);
});
