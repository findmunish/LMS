const validator = require('validator')

const isNameValid = (name) => {
    const updatedName = name.trim().toLowerCase()
    for (let i = 0, chr; i < updatedName.length; i++) {
        chr = updatedName.charAt(i)
        if(chr === ' ') continue
        if(chr < 'a' || chr > 'z') {
            return false
        }
    }

    return true
}

const isPasswordValid = (password) => {
    return true
}

exports.createUserValidator = (req, res, next) => {
    if(req.session.userId) {
        req.session.errors = {}
        res.redirect('/api/dashboard')
        return
    }

    const {name, type, email, password, confirmPassword} = req.body

    let errors = {}

    if(name==='') errors.name = 'Name cannot be blank'
    if(!isNameValid(name)) errors.name = 'Non-alphabet characters not allowed in name'

    if(password==='') errors.password = 'Password is blank'
    if(password.toLowerCase() !== confirmPassword.toLowerCase()) errors.confirmPassword = "Passwords don't match"
    if(!isPasswordValid(password)) errors.password = 'Password fails validation rules'

    if(type==='') errors.type = 'Type cannot be blank'
    if(type !== '1' && type !== "2") errors.type = 'Valid values are Instructor(Value: 1) and Student(Value: 2)'

    if (!validator.isEmail( email.trim().toLowerCase() )) errors.email = 'e-Mail is not valid'

    if(Object.keys(errors).length === 0) {
        next()
    } else {
        req.session.errors = errors
        res.redirect('/api/register')
    }
}

exports.editProfileValidator = (req, res, next) => {
    if(!req.session.userId) {
        req.session.errors = {}
        res.status(403).render('forbidden', data)
        return
    }

    const {name, email} = req.body

    let errors = {}

    if(name==='') errors.name = 'Name cannot be blank'
    if(!isNameValid(name)) errors.name = 'Non-alphabet characters not allowed in name'

    if (email && !validator.isEmail( email.trim().toLowerCase() )) errors.email = 'e-Mail is not valid'
 
    if(Object.keys(errors).length === 0) {
        next()
    } else {
        req.session.errors = errors
        res.redirect('/api/editProfile')
    }
}

exports.changePasswordValidator = (req, res, next) => {
    if(!req.session.userId) {
        req.session.errors = {}
        res.status(403).render('forbidden', data)
        return
    }

    const {currPassword, newPassword, confirmPassword} = req.body

    let errors = {}

    if(currPassword==='') errors.currPassword = 'Current password is blank'

    if(newPassword==='' || confirmPassword === "") errors.currPassword = 'Changed password is blank'

    if(!isPasswordValid(newPassword)) errors.newPassword = 'Password fails validation rules'

    if(newPassword.toLowerCase() !== confirmPassword.toLowerCase()) errors.confirmPassword = "New passwords don't match"

    if(Object.keys(errors).length === 0) {
        next()
    } else {
        req.session.errors = errors
        res.redirect('/api/changePassword')
    }
}

exports.userLoginValidator = async (req, res, next) => {
    if(req.session.userId) {
        req.session.errors = {}
        res.redirect('/api/dashboard')
        return
    }

    const {email, password} = req.body
    let errors = {}

    if(!email) errors.email = 'e-Mail is required'
    if (email && !validator.isEmail( email.trim().toLowerCase() )) errors.email = 'e-Mail is not valid'

    if(password && password==='') errors.password = 'Password is blank'
    if(!isPasswordValid(password)) errors.password = 'Password fails validation rules'

    if(Object.keys(errors).length === 0) {
        next()
    } else {
        req.session.errors = errors
        res.redirect('/api/login')
    }
}