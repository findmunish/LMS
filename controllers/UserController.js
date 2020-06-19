const bcrypt = require('bcryptjs')
const User = require("../models/User")
const SYNC_SALT_ROUNDS=Number(process.env.SYNC_SALT_ROUNDS)
const SESSION_NAME=process.env.SESSION_NAME

exports.userDashboard = (req, res) => {
    if(req.session.userId) {
        res.redirect('/courses/listCourses')
    } else {
        res.redirect('/')
    }
}

exports.login = (req, res) => {
    const data = {
        headerTitle: "LMS | EGyan Portal",
        title: 'LMS | Login',
        errors: req.session.errors,
        userId: req.session.userId,
        loggedUser: req.session.loggedUser
    }
    req.session.errors = {}
    res.render('login', data)
}

exports.register = (req, res) => {
    const data = {
        headerTitle: "LMS | EGyan Portal",
        title: 'LMS | Login',
        errors: req.session.errors,
        userId: req.session.userId,
        loggedUser: req.session.loggedUser
    }
    req.session.errors = {}
    res.render('register', data)
}

exports.loginProcess = async (req, res) => {
    const {email, password} = req.body
    const errMsg = 'Either e-Mail is unregistered or password is invalid'

    try {
        const user = await User.findOne({ email })
        if(user) {
            const valid = await bcrypt.compareSync(password, user.password)
            if(valid) {
                req.session.userId = user._id
                req.session.loggedUser = user.name
                res.status(200).redirect('/courses/listCourses')
                return
            }
        }
        if(!req.session.errors) {
            req.session.errors = {}
        }
        req.session.errors.password = errMsg
        res.status(400).redirect('/api/login')

    } catch(error) {
        if(!req.session.errors.password) {
            req.session.errors.password = error.message
        }
        res.status(400).redirect('/api/login')
    }
}

exports.registerProcess = async (req, res) => {
    const {name, type, email, password} = req.body

    try {
        const user = await User.findOne({ email: email.trim().toLowerCase() })
        if(user) {
            if(!req.session.errors) {
                req.session.errors = {}
            }
            req.session.errors.email = 'e-Mail already registered'
            throw Error(req.session.errors.email)
        } else {
            const newUser = new User()
            newUser.name = name
            newUser.type = type
            newUser.email = email

            const salt = await bcrypt.genSaltSync(SYNC_SALT_ROUNDS)
            const hash = await bcrypt.hashSync(password, salt)

            newUser.password = hash
            newUser.save()
            req.session.loggedUser = newUser.name
            req.session.userId = newUser._id

            res.status(200).redirect('/courses/listCourses')
        }
    } catch(error) {
        if(!req.session.errors.email) {
            req.session.errors.email = error.message
        }
        res.status(500).redirect('/api/register')
    }
}

exports.changePassword = (req, res) => {
    const data = {
        headerTitle: "LMS | EGyan Portal",
        title: 'LMS | Login',
        errors: req.session.errors,
        userId: req.session.userId,
        loggedUser: req.session.loggedUser
    }
    req.session.errors = {}

    res.render('changePassword', data)
}

exports.changePasswordProcess = (req, res) => {
    const {currPassword, newPassword, confirmPassword} = req.body

    User.findOne({ _id: Object(req.session.userId) })
    .then((user) => {
        const valid = bcrypt.compareSync(currPassword, user.password)
        if(valid) {
            const salt = bcrypt.genSaltSync(SYNC_SALT_ROUNDS)
            const hashedPassword = bcrypt.hashSync(newPassword, salt)
            user.password = hashedPassword
            return user.save()
        } else {
            req.session.errors.password = "Password cannot be authenticated"
            throw new Error(req.session.errors.password)
        }
    })
    .then(() => res.redirect('/courses/listCourses'))
    .catch((error) => {
        if(!req.session.errors.password) {
            req.session.errors.password = error.message
        }
        res.status(500).redirect('/api/changePassword')
    })
}

exports.editProfile = (req, res) => {
    const data = {
        headerTitle: "LMS | EGyan Portal",
        title: 'LMS | Login',
        errors: req.session.errors,
        userId: req.session.userId,
        loggedUser: req.session.loggedUser
    }
    req.session.errors = {}
    
    User.findOne({ _id: Object(req.session.userId) })
        .then((user) => {
            if(user) {
                data.userName = user.name,
                data.userEmail = user.email

                res.render('editProfile', data)
            } else {
                req.session.errors.name = 'User not found'
                res.status(400).redirect('/api/editProfile')
            }
        })
        .catch((error) => {
            if(!req.session.errors.name) {
                req.session.errors.name = error.message
            }
            res.status(400).redirect('/api/editProfile')
        })
}

exports.editProfileProcess = async (req, res) => {
    const {name, email} = req.body

    try {
        const currentUser = await User.findOne({ _id: req.session.userId })
        if(!currentUser) {
            req.session.errors.email = 'Cannot find the user!'
            throw Error(req.session.errors.email)
        }
        if(currentUser.email !== email.trim().toLowerCase()) {
            const otherUser = await User.findOne({ email: email.trim().toLowerCase() })
            if(otherUser) {
                req.session.errors.email = 'e-Mail already registered'
                throw Error(req.session.errors.email)
            }
        }
        currentUser.email = email
        currentUser.name = name
        console.log('BEFORE SAVING THE USEER')
        await currentUser.save()
        console.log('AFTER SAVING THE USER')

        req.session.loggedUser = currentUser.name
        res.redirect('/courses/listCourses')
    } catch (error) {
        if(!req.session.errors.email) {
            req.session.errors.email = error.message
        }
        res.status(500).redirect('/api/editProfile')
    }
}

exports.logoutProcess = (req, res) => {
     req.session.destroy(err => {
        if(err) {
            return res.redirect('/')
        }

        res.clearCookie(SESSION_NAME)
        res.redirect('/')
    })
}