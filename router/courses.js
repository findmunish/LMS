const express = require('express')
const router = express.Router()
const courseController = require('../controllers/CourseController')
const courseValidator = require('../controllers/CourseValidator')
const authController = require('../auth/auth')

//UI Routes
router.get('/listCourses', authController.isLoggedIn, courseController.listCourses)
router.get('/listCourse/:id', authController.isLoggedIn, courseController.listCourse)
router.get('/createCourse', authController.isLoggedIn, courseController.createCourse)
router.get('/updateCourse/:id', authController.isLoggedIn, courseController.updateCourse)

//Processes
router.post('/createCourse', courseValidator.createCourseValidator, courseController.createCourseProcesses)
router.post('/updateCourse/:id', courseValidator.updateCourseValidator, courseController.updateCourseProcesses)
router.get('/deleteCourse/:id', authController.isLoggedIn, courseController.deleteCourse)

module.exports = router