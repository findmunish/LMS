
exports.homeRoute = (req, res) => {
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
