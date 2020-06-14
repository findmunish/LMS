const express = require('express')
const router = express.Router()
const courseController = require('../controllers/CourseController')
const courseValidator = require('../controllers/CourseValidator')

//UI Routes
router.get('/listCourses', courseController.listCourses)
router.get('/listCourse/:id', courseController.listCourse)
router.get('/createCourse', courseController.createCourse)
router.get('/updateCourse/:id', courseController.updateCourse)

//Processes
router.post('/createCourse', courseValidator.createCourseValidator, courseController.createCourseProcesses)
router.post('/updateCourse/:id', courseValidator.updateCourseValidator, courseController.updateCourseProcesses)
router.get('/deleteCourse/:id', courseController.deleteCourse)

module.exports = router