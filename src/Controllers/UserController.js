import { Router } from 'express'
// import User from '../Models/User'
import { createNewUser, findUser } from '../Queries'
import { checkHashedPassword } from '../helpers'

const UserController = Router()

UserController.post('/create', async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  } = req?.body

  try {
    const newUser = await createNewUser({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    })
    console.log('newUser', newUser)
    res.send(newUser)
  } catch (err) {
    res.send(err)
  }
})
UserController.post('/login', async (req, res) => {
  const {
    email,
    password,
  } = req?.body
  try {
    const users = await findUser({ email })
    const user = users[0]
    console.log('user', user)
    const isPasswordsMatch = await checkHashedPassword({ password, hash: user.password })
    if (user && isPasswordsMatch) {
      console.log('yes')
    } else {
      res.status(401)
      res.send('Failed authentication')
    }
  } catch (err) {
    res.send(err)
  }
})
export default UserController
