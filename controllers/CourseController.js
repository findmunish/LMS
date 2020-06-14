const Course = require('../models/Course')
const User = require("../models/User")

// const getUserName = (userId) => {
//     let name = undefined
//     if(user !== undefined) {
//         User.findOne({ userId })
//         .then((user) => name = user.name)
//         .catch((error) => name = undefined)
//     }

//     return name
// }

exports.listCourses = (req, res) => {
    //const loggedUser = getUserName(req.session.userId)
    const data = {
        headerTitle: "LMS | EGyan Portal",
        title: 'LMS | Login',
        userId: req.session.userId,
        loggedUser: req.session.loggedUser
    }

    req.session.errors = {}

    Course.find()
    .then(courses => {
        data.courses = courses
        res.render('listCourses', data)
    })
    .catch(error => res.status(400).json(error))
}

exports.listCourse = (req, res) => {
    //const id = req.params.id
    //const loggedUser = getUserName(req.session.userId)
    const data = {
        headerTitle: "LMS | EGyan Portal",
        title: 'LMS | Login',
        userId: req.session.userId,
        loggedUser: req.session.loggedUser        
    }

    req.session.errors = {}

    Course.findOne({ _id: req.params.id })
    .then(course => {
        data.course = course
        res.render('viewCourse', data)
    })
    .catch(error => res.json(error))
}

exports.createCourse = (req, res) => {
    //const loggedUser = getUserName(req.session.userId)
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
        .catch((error) => res.status(400).json(error))
}

exports.updateCourse = (req, res) => {
    // let categories = []
    // let names = []
    // Course.find()
    // .then(courses => {
    //     courses.forEach( (course) => {
    //         if(!categories.includes(course.category)) {
    //             categories.push(course.category)
    //         }
    //         if(!names.includes(course.name)) {
    //             names.push(course.name)
    //         }
    //     })
    // })
    // .catch(error => {
    //     console.log(error)
    //     res.status(400).send(error)
    //     return

    // })
    const data = {
        headerTitle: "LMS | EGyan Portal",
        title: 'LMS | Login',
        userId: req.session.userId,
        errors: req.session.errors,
        loggedUser: req.session.loggedUser
    }

    req.session.errors = {}

    Course.findOne({ _id: req.params.id })
    .then((currCourse) => {
        data.currCourse = currCourse

        res.render('updateCourses', data)
    })
    .catch(error => res.json(error))
}

exports.updateCourseProcesses = (req, res) => {
    const {id, name, category, oneLiner, duration, language, description, photo} = req.body

    console.log('global:', description)
    Course.findOne({ _id: req.params.id })
        .then(course => {
            course.name = name
            course.category = category
            course.oneLiner = oneLiner
            course.duration = Number(duration)
            course.language = language
            course.description = description
            course.photo = photo

            console.log('db:', course.description)

            return course.save()
        })
        .then(course => res.redirect('/courses/listCourses'))
        .catch((error) => {
            console.log('error updating')
            res.status(500).redirect('/courses/listCourses')
        })
}

exports.deleteCourse = (req, res) => {
    const id = req.params.id
    Course.findOne({ _id: Object(id) })
            .then((course) => {
                if (!course) {
                    return res.status(404).send()
                } else {
                    return course.remove()
                }
            })
            .then(() => res.redirect('/courses/listCourses'))
            .catch(() => res.status(500).redirect('/courses/listCourses'))
}

