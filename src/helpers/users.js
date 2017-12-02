import jsonwebtoken from 'jsonwebtoken'
import Promise from 'bluebird'

const {signAsync} = Promise.promisifyAll(jsonwebtoken)

export const sign = user => signAsync({_id: user._id, email: user.email, name: user.name}, 'blackGoku', {})
