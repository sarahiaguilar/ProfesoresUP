import upload from '../helpers/upload'

const create = (req, res, next) =>
  upload(req).then(input => req.models.course.create(input))
  .then(result => res.status(200).json(result))
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error al crear Course'})
  })

const read = (req, res, next) =>
  req.models.course.find(req.params.id ? {_id: req.params.id} : {})
  .populate('evaluation')
  .then(result => res.status(200).json(result))
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error al obtener Course'})
  })

const update = (req, res, next) =>
  upload(req).then(input => req.models.course.findByIdAndUpdate(req.params.id, input, {new: true}))
  .then(result => res.status(200).json(result))
  .catch(err => res.status(500).json({message: 'Error al actualizar Course'}))

const destroy = (req, res, next) =>
  req.models.course.findByIdAndRemove(req.params.id)
  .then(result => res.status(200).json(result))
  .catch(err => res.status(500).json({message: 'Error al eliminar Course'}))

module.exports = {create, read, update, destroy}
