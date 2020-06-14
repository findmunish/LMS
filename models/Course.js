const mongoose = require('mongoose')

//3. Create a Schema for Tasks collection.
const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    oneLiner: {
        type: String,
        trim: true
    },
    duration: {
        type: Number,
        trim: true,
        required: true,
        default: 0
    },
    language: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    lessons: {
        type: Array
    },
    photo: {
        type: String
    }
})

//4. Create a Model for courses collection.
const Course = mongoose.model('lms', CourseSchema, 'courses')//'tasks' is a collection name and is optional. Can be inferred from Model Name

module.exports = Course