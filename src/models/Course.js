import mongoose, {Schema} from 'mongoose'

const CourseSchema = Schema({
  name: String
})

export default mongoose.model('course', CourseSchema, 'courses')
