import { createEnv } from "@t3-oss/env-nuxt";
import { z } from "zod";

export const env = createEnv({
  server: {
    JWT_TOKEN: z
      .string()
      .default(
        "ed09d0cae9041017037aeff7d327cc402b401140421e1f52b65c0a99415c78fa",
      ),
    JWT_TOKEN_EXPIRES_IN: z.string().default("30m"),
  },
  client: {},
});
