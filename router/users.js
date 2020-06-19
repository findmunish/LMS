const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const userValidator = require('../controllers/UserValidator')
const authController = require('../auth/auth')

//UI Routes
router.get('/login', authController.isNotLoggedIn, userController.login)
router.get('/register', authController.isNotLoggedIn, userController.register)
router.get('/editProfile', authController.isLoggedIn, userController.editProfile)
router.get('/changePassword', authController.isLoggedIn, userController.changePassword)
router.get('/dashboard', userController.userDashboard)

//Processes
router.post('/login', userValidator.userLoginValidator, userController.loginProcess)
router.post('/register', userValidator.createUserValidator, userController.registerProcess)
router.post('/editProfile', userValidator.editProfileValidator, userController.editProfileProcess)
router.post('/changePassword', userValidator.changePasswordValidator, userController.changePasswordProcess)
router.post('/logout', authController.isLoggedIn, userController.logoutProcess)

module.exports = router