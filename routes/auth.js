const express = require('express')
const router = express.Router()
const authController = require('../controller/auth.controller')
const { check } = require('express-validator')

router.post('/', authController.login)

module.exports = router
