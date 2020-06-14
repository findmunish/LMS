const path = require('path')
const express = require('express')
require('./db/mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')

const homeRouter = require('./router/homeRoute')
const coursesRouter = require('./router/courses')
const usersRouter = require('./router/users')

const app = express()

const sess = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {}
}

app.use(session(sess))

app.set('view engine', 'ejs')
app.set('views', 'views')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const publicDirectoryPath = path.join(__dirname, "./public")

app.use(express.static(publicDirectoryPath))

app.use('/', homeRouter)
app.use('/courses', coursesRouter)
app.use('/api', usersRouter)


module.exports = app
