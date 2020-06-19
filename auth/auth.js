exports.isLoggedIn = (req, res, next) => {
    if(req.session.userId === undefined) {
        if(req.session.errors === undefined) {
            req.session.errors = {}
        }
        req.session.errors.notLoggedIn = 'Please login / sign-up to access the given resources.'

        const data = {
            headerTitle: "LMS | EGyan Portal",
            title: 'LMS | Login',
            errors: req.session.errors,
            userId: req.session.userId,
            loggedUser: req.session.loggedUser
        }
        req.session.errors = {}

        res.status(403).render('forbidden', data)
    } else {
        next()
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if(req.session.errors === undefined) {
        req.session.errors = {}
    }
    if(req.session.userId === undefined) {
        next()
    }
    else {
        res.redirect('/api/dashboard')
    }
}