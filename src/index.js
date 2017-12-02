import path from 'path'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {json, urlencoded} from 'body-parser'
import models from './models/'
import controllers from './controllers/'

const app = express()
const PORT = 8002
const NODE_ENV = 'development'

models('mean2').then(mongoose => {
  app
    .use(mongoose.middleware)
    .use(cors())
    .use(urlencoded({extended: false}))
    .use(json())
    .use(morgan('dev'))
    .use('/uploads', express.static(path.join(__dirname, '../../uploads')))
    .get('/', (req, res) => res.send('ProfesoresUP'))
    .use('/api', controllers)
    .listen(PORT)
    .on('listening', () => console.log(`Listening at port ${PORT} in ${NODE_ENV} mode`))
    .on('error', err => console.log(err.code))
})
.catch(e => console.log(e))
