const mongoose = require('mongoose')
const validator = require('validator')

//3. Create a Schema for Tasks collection.
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: Number,
        trim: true,
        required: true,
        default: 1
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        // validate(value) {
        //     if (value.toLowerCase().includes('password')) {
        //         throw new Error('Password cannot contain "password"')
        //     }
        // },
        // minlength: 7,
        trim: true
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User