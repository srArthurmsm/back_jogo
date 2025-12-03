const express = require('express')
const router = express.Router()

const authController = require('../controller/auth.controller')

// Login
router.post('/login', authController.Login)

module.exports = router
