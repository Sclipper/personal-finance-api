import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import mongoose from 'mongoose'
import UserController from './src/Controllers/UserController'

import 'dotenv/config'

const upload = multer()

const app = express()
mongoose.connect(process.env.MONGO_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array())
app.use(express.static('public'))
app.use(express.json())

app.use('/user', UserController)

app.listen(8080, () => console.log('Example app listening on port 8080!'))
