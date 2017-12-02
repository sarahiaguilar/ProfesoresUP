import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import Promise from 'bluebird'
import omit from 'lodash/omit'

const {hashAsync} = Promise.promisifyAll(bcrypt)
const {signAsync} = Promise.promisifyAll(jsonwebtoken)
const BADCREDENTIALS = () => Promise.reject(new Error('Bad Credentials'))

const compare = (user, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, res) => {
      if (err) return reject(new Error(err))
      if (res) return resolve(user)
      return reject(new Error('Bad Credentials'))
    })
  })
}

const UserSchema = Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  career: String,
  role: String
})

UserSchema.pre('save', function (next) {
  hashAsync(this.password, 10)
  .then((hash) => {
    this.password = hash
    next()
  })
})

UserSchema.statics.authenticate = function ({password, email}) {
  if (!password || !email) return BADCREDENTIALS()
  return this.findOne({email}).select('_id password name email surname career').lean().exec()
  .then(user => user ? compare(user, password) : BADCREDENTIALS())
  .then(user => user ? signAsync(omit(user, ['password']), 'blackGoku', {}) : BADCREDENTIALS())
}

export default mongoose.model('user', UserSchema, 'users')
