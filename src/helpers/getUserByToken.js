import jwt_decode from 'jwt-decode'
import User from '../Models/User'

export const getUserByToken = async req => {
  const token = req.header('Authorization')
  const decoded = jwt_decode(token)
  const user = await User.find({ email: decoded.email })
  return user[0]
}
