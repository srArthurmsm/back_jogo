const express = require('express')
const router = express.Router()

const upload = require('../config/uploadConfig')
const jogoController = require('../controller/jogo.controller')
const middleware = require('../middleware/auth.middleware')

// Listar jogos
router.get('/', jogoController.listar)

// Buscar por ID
router.get('/:id', jogoController.findByID)

// Cadastrar 1 jogo
router.post(
    '/',
    upload.single('capa'),
    middleware.middleware,
    middleware.ranking,
    jogoController.cadastrar
)

// Cadastrar lote de jogos
router.post(
    '/lote',
    upload.array('capas', 10),
    middleware.middleware,
    middleware.ranking,
    jogoController.cadastrarLote
)

module.exports = router