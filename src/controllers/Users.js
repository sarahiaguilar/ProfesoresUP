import boom from 'boom'
import {sign} from '../helpers/users'
import upload from '../helpers/upload'

export const auth = (req, res, next) =>
  req.models.user.authenticate(req.body)
  .then(jwt => res.json(jwt))
  .catch(err => {
    if (err.toString().match(/Bad Credentials/g)) return next(boom.wrap(err, 400))
    next(boom.wrap(err, 500))
  })

export const create = (req, res, next) =>
  req.models.user.create({...req.body, user: req.user._id})
  .then(user => res.json(user))
  .catch(err => next(boom.wrap(err, 400)))

export const list = (req, res, next) =>
  req.models.user.find({}, '-password').exec()
  .then(users => res.json(users))
  .catch(err => next(boom.wrap(err, 500)))

export const show = (req, res, next) =>
  req.models.user.findOne({...req.query}, '-password').exec()
  .then(users => res.json(users))
  .catch(err => next(boom.wrap(err, 500)))

export const register = (req, res, next) => {
  if (!req.body) return next(boom.wrap(new Error('no data'), 400))
  const role = 'role_user'
  return upload(req).then(input => req.models.user.create({...input, role}))
  .then(user => sign(user))
  .then(jwt => res.json(jwt))
  .catch(err => next(boom.wrap(err, 400)))
}
