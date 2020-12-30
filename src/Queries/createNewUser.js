import User from '../Models/User'
import { hashPassword } from '../helpers'

export const createNewUser = async ({
  name,
  email,
  country,
  refreshToken,
  password,
}) => {
  const newUser = new User({
    name,
    email,
    country,
    refresh_token: refreshToken,
    password: hashPassword(password),
  })
  return newUser.save()
    .then(res => ({
      id: res.id,
      name: res.name,
      country: res.country,
      email: res.email,
    })).catch(err => {
      console.log(err)
      return err
    })
}
