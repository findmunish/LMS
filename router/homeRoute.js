const express = require('express')
const router = express.Router()
const homeRouteController = require('../controllers/homeRouteController')

router.get('/', homeRouteController.homeRoute)


module.exports = router