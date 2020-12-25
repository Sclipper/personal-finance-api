import User from '../Models/User'

export const findUser = async keyValuePair => User.find(keyValuePair)
  .then(user => user)
  .catch(err => err)
