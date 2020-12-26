import jwt from 'jsonwebtoken'
import { REFRESH_TOKEN_SECRET } from './env'

export const generateRefreshToken = user => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET)
}
