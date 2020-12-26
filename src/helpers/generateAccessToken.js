import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from './env'

export const generateAccessToken = user => {
  return jwt.sign({
    firstName: user.first_name,
    lastName: user.last_name,
    phoneNumber: user.phone_number,
    email: user.email,
  }, ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
}
