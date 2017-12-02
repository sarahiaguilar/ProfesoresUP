import mongoose, {Schema} from 'mongoose'

const EvaluationSchema = Schema({
  difficulty: Number,
  clearness: Number,
  help: Number,
  comment: String,
  date: String,
  professor: {type: Schema.ObjectId, ref: 'professor'},
  course: {type: Schema.ObjectId, ref: 'course'}
})

export default mongoose.model('evaluation', EvaluationSchema, 'evaluations')
