import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import Promise from 'bluebird'

const files = fs.readdirSync(__dirname)

files.forEach(function (file) {
  const fileName = path.basename(file, '.js')
  if (fileName !== 'index') {
    exports[fileName] = require('./' + fileName)
  }
})

function MongooseMiddleware (req, res, next) {
  req.mongoose = mongoose
  req.models = mongoose.models
  return next()
}

export default function MongooseConnection (dbName) {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/' + dbName, (err) => {
      if (err) return reject(err)
      mongoose.middleware = MongooseMiddleware
      mongoose.Promise = Promise
      mongoose.connection.on('error', (err) => console.log('Mongoose default connection error: ' + err))
      mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'))
      return resolve(mongoose)
    })
  })
}
