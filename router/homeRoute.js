const express = require('express')
const router = express.Router()
const homeRouteController = require('../controllers/homeRouteController')

router.get('/', homeRouteController.homeRoute)
router.get('/*', homeRouteController.invalidRoute) 

module.exports = router