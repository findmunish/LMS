exports.homeRoute = (req, res) => {
    if(req.session.errors === undefined) {
        req.session.errors = {}
    }
    const data = {
        headerTitle: "LMS | EGyan Portal",
        title: 'LMS | Login',
        userId: req.session.userId,
        errors: req.session.errors,
        loggedUser: req.session.loggedUser
    }

    if(req.session.userId !== undefined) {
        res.redirect('/courses/listCourses')
    } else {
        res.render('welcome', data)
    }
}

exports.invalidRoute = (req, res) => {
    if(req.session.errors === undefined) {
        req.session.errors = {}
    }
    const data = {
        headerTitle: "LMS | EGyan Portal",
        title: 'LMS | Login',
        userId: req.session.userId,
        errors: req.session.errors,
        loggedUser: req.session.loggedUser,
        path: req.path,
        method: req.method
    }

    res.status(405).render('404', data)
}