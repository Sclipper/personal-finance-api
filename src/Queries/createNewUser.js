import User from '../Models/User'
import { hashPassword } from '../helpers'

export const createNewUser = async ({
  firstName,
  lastName,
  phoneNumber,
  email,
  refreshToken,
  password,
}) => {
  const newUser = new User({
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    email,
    refresh_token: refreshToken,
    password: hashPassword(password),
  })
  return newUser.save()
    .then(res => ({
      id: res.id,
      first_name: res.first_name,
      last_name: res.last_name,
      phone_number: res.phone_number,
      email: res.email,
    })).catch(err => {
      console.log(err)
      return err
    })
}
