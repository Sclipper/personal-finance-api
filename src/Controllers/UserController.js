import { Router } from 'express'
// import User from '../Models/User'
import { getUserByToken } from '../helpers'

const UserController = Router()

UserController.get('/test', async (req, res) => {
  console.log('req', req)
  res.send('all good')
})

UserController.post('/save-statement', async (req, res) => {
  const user = await getUserByToken(req)
  const { assets, liabilities } = req.body
  try {
    if (!user.financial_statement) {
      user.create({ financial_statement: [{ assets, liabilities }] })
    } else {
      user.financial_statement.push({ assets, liabilities, created_at: new Date() })
    }
    user.save()

    res.send('all good')
  } catch (error) {
    res.send(error)
  }
})
UserController.get('/get-data', async (req, res) => {
  try {
    const user = await getUserByToken(req)

    res.send(user)
  } catch (error) {
    res.send(error)
  }
})

export default UserController
