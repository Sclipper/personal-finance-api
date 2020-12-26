import { Router } from 'express'
// import User from '../Models/User'

const UserController = Router()

UserController.get('/test', async (req, res) => {
  console.log('req', req)
  res.send('all good')
})

export default UserController
