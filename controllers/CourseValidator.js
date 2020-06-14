const validator = require('validator')

const performSchemaValidations = (redirectRoute, req, res, next) => {
    const {name, category, oneLiner, duration, language, description, photo} = req.body

    let errors = {}

    if(name==='') errors.name = 'Name cannot be blank'
    if(description==='') errors.description = 'Description cannot be blank'
    if(duration==='') errors.duration = 'Duration cannot be blank'
    if(category==='') errors.category = 'Category cannot be blank'
    if(oneLiner==='') errors.oneLiner = 'Oneliner cannot be blank'
    if(language==='') errors.language = 'Language cannot be blank'
    if(photo==='') errors.photo = 'Photo has to have a URL'

    if(!validator.isURL(photo)) errors.photo = 'Photo should be a valid url'
    if(Object.keys(errors).length === 0) {
        next()
    } else {
        req.session.errors = errors
        res.redirect(redirectRoute)
    }
}

exports.createCourseValidator = (req, res, next) => {
    performSchemaValidations('/courses/createCourse', req, res, next)
}

exports.updateCourseValidator = (req, res, next) => {
    performSchemaValidations('/courses/updateCourse/' + req.params.id, req, res, next)
}