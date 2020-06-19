const Course = require('../models/Course')

exports.listCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        const data = {
            headerTitle: "LMS | EGyan Portal",
            title: 'LMS | Login',
            userId: req.session.userId,
            loggedUser: req.session.loggedUser,
            errors: req.session.errors,
            courses: courses
        }

        req.session.errors = {}

        res.render('listCourses', data)
    } catch (error) {
        req.session.errors = error.message
        res.status(400).redirect('/courses/listCourses/', data)
    }
}

exports.listCourse = async (req, res) => {
    try {
        const data = {
            headerTitle: "LMS | EGyan Portal",
            title: 'LMS | Login',
            userId: req.session.userId,
            loggedUser: req.session.loggedUser,
            errors: req.session.errors        
        }
    
        req.session.errors = {}
        course = await Course.findOne({ _id: req.params.id })
        data.course = course
        res.render('viewCourse', data)
    } catch (error) {
        req.session.errors.courseError = error.message
        res.status(400).redirect('/courses/listCourses')
    }
}

exports.createCourse = (req, res) => {
    const data = {
        headerTitle: "LMS | EGyan Portal",
        title: 'LMS | Login',
        userId: req.session.userId,
        errors: req.session.errors,
        loggedUser: req.session.loggedUser
    }

    req.session.errors = {}

    res.render('createCourse', data)
}

exports.createCourseProcesses = (req, res) => {
   const {name, category, oneLiner, duration, language, description, photo} = req.body

   const course = new Course()
   course.name = name
   course.category = category
   course.oneLiner = oneLiner
   course.duration = Number(duration)
   course.language = language
   course.description = description
   course.photo = photo

   course.save()
        .then(() => res.status(200).redirect('/courses/listCourses'))
        .catch((error) => {
            req.session.errors.courseError = error.message
            res.status(400).redirect('/courses/listCourses')
        })
}

exports.updateCourse = async (req, res) => {
    try {
        const data = {
            headerTitle: "LMS | EGyan Portal",
            title: 'LMS | Login',
            userId: req.session.userId,
            errors: req.session.errors,
            loggedUser: req.session.loggedUser
        }
        req.session.errors = {}

        currCourse = await Course.findOne({ _id: req.params.id })
            data.currCourse = currCourse
            res.render('updateCourse', data)
    } catch (error) {
        req.session.errors.course = 'Requested course does not exist!!'
        res.status(404).redirect('/courses/listCourses')
    }
}

exports.updateCourseProcesses = async (req, res) => {
    try {
        const {id, name, category, oneLiner, duration, language, description, photo} = req.body

        course = await Course.findOne({ _id: req.params.id })
        if(course) {
            course.name = name
            course.category = category
            course.oneLiner = oneLiner
            course.duration = Number(duration)
            course.language = language
            course.description = description
            course.photo = photo

            await course.save()
            res.redirect('/courses/listCourses')
        }
                
    } catch (error) {
        req.session.errors.course = error.message
            res.status(400).redirect('/courses/listCourses')
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        req.session.errors = {}
        const course = await Course.findOne({ _id: req.params.id })
        await course.remove()

        res.redirect('/courses/listCourses')
    } catch(error) {
        req.session.errors.course = error.message
        res.status(500).redirect('/courses/listCourses')
    }
}