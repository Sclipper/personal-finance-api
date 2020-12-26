import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { createNewUser, findUser } from '../Queries'
import { checkHashedPassword, generateAccessToken, generateRefreshToken } from '../helpers'

import { REFRESH_TOKEN_SECRET } from '../helpers/env'

const AuthControler = Router()

AuthControler.post('/register', async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  } = req?.body

  try {
    const refreshToken = generateRefreshToken({
      firstName,
      lastName,
      phoneNumber,
      email,
    })

    const newUser = await createNewUser({
      firstName,
      lastName,
      phoneNumber,
      email,
      refreshToken,
      password,
    })

    res.send(newUser)
  } catch (err) {
    res.send(err)
  }
})

AuthControler.post('/login', async (req, res) => {
  const {
    email,
    password,
  } = req?.body
  try {
    const users = await findUser({ email })
    const user = users[0]
    const isPasswordsMatch = await checkHashedPassword({ password, hash: user.password })
    if (user && isPasswordsMatch) {
      const accessToken = generateAccessToken({
        firstName: user.first_name,
        lastName: user.last_name,
        phoneNumber: user.phone_number,
        email: user.email,
      })
      res.json({ accessToken, refreshToken: user.refresh_token })
    } else {
      res.status(401)
      res.send('Failed authentication')
    }
  } catch (err) {
    res.send(err)
  }
})

AuthControler.post('/token', async (req, res) => {
  const refreshToken = req.body.token
  console.log('refresh token', refreshToken)
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403)
      res.send('Your token is invalid')
    }
    if (user) {
      findUser({ email: user.email })
        .then(correspondingUser => {
          if (correspondingUser?.length) {
            const accessToken = generateAccessToken({
              firstName: user.firstName,
              lastName: user.lastName,
              phoneNumber: user.phoneNumber,
              email: user.email,
            })
            res.json({ accessToken })
          }
        })
        .catch(error => {
          console.log('err', error)
          res.send(error)
        })
    }
  })
})

export default AuthControler
