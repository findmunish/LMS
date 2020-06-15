const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const userValidator = require('../controllers/UserValidator')

//UI Routes
router.get('/login', userController.login)
router.get('/register', userController.register)
router.get('/editProfile', userController.editProfile)
router.get('/changePassword', userController.changePassword)
router.get('/dashboard', userController.userDashboard)

//Processes
router.post('/login', userValidator.userLoginValidator, userController.loginProcess)
router.post('/register', userValidator.createUserValidator, userController.registerProcess)
router.post('/editProfile', userValidator.editProfileValidator, userController.editProfileProcess)
router.post('/changePassword', userValidator.changePasswordValidator, userController.changePasswordProcess)
router.post('/logout', userController.logoutProcess)

module.exports = router