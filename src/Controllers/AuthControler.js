import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { createNewUser, findUser } from '../Queries'
import { checkHashedPassword, generateAccessToken, generateRefreshToken } from '../helpers'

import { REFRESH_TOKEN_SECRET } from '../helpers/env'

const AuthControler = Router()

AuthControler.post('/register', async (req, res) => {
  const {
    name,
    country,
    email,
    password,
  } = req?.body
  try {
    const refreshToken = generateRefreshToken({
      name,
      email,
      country,
    })

    const newUser = await createNewUser({
      name,
      email,
      country,
      refreshToken,
      password,
    })

    res.send({ ...newUser, refreshToken })
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
    console.log('login')
    const users = await findUser({ email })
    if (!users?.length) {
      res.status(401)
      res.send('No user found')
      return
    }
    const user = users?.[0]
    const isPasswordsMatch = await checkHashedPassword({ password, hash: user.password })
    if (user && isPasswordsMatch) {
      res.json({ refreshToken: user.refresh_token })
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
              name: user.name,
              country: user.country,
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
