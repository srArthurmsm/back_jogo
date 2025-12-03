const express = require('express')
const router = express.Router()

const generoController = require('../controller/genero.controller')
const middleware = require('../middleware/auth.middleware')

// Listar gêneros
router.get('/', middleware.middleware, middleware.ranking, generoController.listar)

// Cadastrar gênero
router.post('/', middleware.middleware, middleware.ranking, generoController.cadastrar)

module.exports = router