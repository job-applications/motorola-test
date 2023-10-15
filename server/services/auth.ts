import jwt from 'jsonwebtoken';
import { env } from "~/env"
import { UserRecord } from "../types"

export const getUserAccessToken = (user: UserRecord) => {
  return jwt.sign({ id: user.id, type: "user" }, env.JWT_TOKEN, {
    expiresIn: env.JWT_TOKEN_EXPIRES_IN,
  })
}
