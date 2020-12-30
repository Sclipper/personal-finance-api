import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import mongoose from 'mongoose'
import cors from 'cors'
import UserController from './src/Controllers/UserController'
import AuthControler from './src/Controllers/AuthControler'
import { authenticateToken } from './src/helpers'
import { MONGO_CONNECT } from './src/helpers/env'

import 'dotenv/config'

const upload = multer()

const app = express()
mongoose.connect(MONGO_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array())
app.use(express.static('public'))
app.use(express.json())

app.use('/user', authenticateToken, UserController)
app.use('/auth', AuthControler)

app.listen(8080, () => console.log('Example app listening on port 8080!'))
