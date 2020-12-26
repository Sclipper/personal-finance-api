import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: false },
  phone_number: { type: String, required: false },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  refresh_token: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at' } })

const User = mongoose.model('User', userSchema)
export default User
