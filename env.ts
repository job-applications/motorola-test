import { createEnv } from "@t3-oss/env-nuxt";
import { z } from "zod";

export const env = createEnv({
  server: {
    JWT_TOKEN: z.string(),
    JWT_TOKEN_EXPIRES_IN: z.string().default("30m"),
  },
  client: {},
});
