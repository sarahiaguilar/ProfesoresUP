import mongoose, {Schema} from 'mongoose'

const ProfessorSchema = Schema({
  name: String
})

export default mongoose.model('professor', ProfessorSchema, 'professors')
