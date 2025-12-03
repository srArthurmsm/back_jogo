const express = require('express')
const router = express.Router()

const reviewController = require('../controller/review.controller')
const middleware = require('../middleware/auth.middleware')

// Listar reviews
router.get('/', reviewController.listar)

// Criar review
router.post('/', middleware.middleware, reviewController.cadastrar)

module.exports = router
