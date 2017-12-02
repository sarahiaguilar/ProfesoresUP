import upload from '../helpers/upload'

const create = (req, res, next) =>
  upload(req).then(input => req.models.professor.create(input))
  .then(result => res.status(200).json(result))
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error al crear Professor'})
  })

const read = (req, res, next) =>
  req.models.professor.find(req.params.id ? {_id: req.params.id} : {})
  .populate('evaluation')
  .then(result => res.status(200).json(result))
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error al obtener Professor'})
  })

const update = (req, res, next) =>
  upload(req).then(input => req.models.professor.findByIdAndUpdate(req.params.id, input, {new: true}))
  .then(result => res.status(200).json(result))
  .catch(err => res.status(500).json({message: 'Error al actualizar Professor'}))

const destroy = (req, res, next) =>
  req.models.professor.findByIdAndRemove(req.params.id)
  .then(result => res.status(200).json(result))
  .catch(err => res.status(500).json({message: 'Error al eliminar Professor'}))

module.exports = {create, read, update, destroy}
