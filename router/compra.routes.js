const express = require('express')
const router = express.Router()

const compraController = require('../controller/compra.controller')
const middleware = require('../middleware/auth.middleware')

// Criar compra
router.post('/', middleware.middleware, compraController.cadastrar)

// Criar compra pelo carrinho
router.post('/carrinho', middleware.middleware, compraController.cadastrarCarrinho)

// Listar compras
router.get('/', middleware.middleware, compraController.listar)

module.exports = router