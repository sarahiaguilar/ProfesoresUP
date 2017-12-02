import {Router} from 'express'
import {err, notFound} from '../middlewares/error'
import authorize from '../middlewares/authorize'
import * as user from './Users'
import * as professors from './Professors'
import * as evaluations from './Evaluations'
import * as courses from './Courses'

const router = Router()
  .post('/login', user.auth)
  .post('/register', user.register)
  .get('/users', user.list)
  //.use(authorize)
  .post('/professors', professors.create)
  .get('/professors/:id?', professors.read)
  .put('/professors/:id', professors.update)
  .delete('/professors/:id', professors.destroy)
  .post('/courses', courses.create)
  .get('/courses/:id?', courses.read)
  .put('/courses/:id', courses.update)
  .delete('/courses/:id', courses.destroy)
  .post('/evaluations', evaluations.create)
  .get('/evaluations/:id?', evaluations.read)
  .put('/evaluations/:id', evaluations.update)
  .delete('/evaluations/:id', evaluations.destroy)
  .use('*', notFound)
  .use(err)

export default router
