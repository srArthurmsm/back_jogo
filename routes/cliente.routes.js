const express = require('express')
const router = express.Router()

const upload = require('../config/uploadConfig')
const clienteController = require('../controller/cliente.controller')

// Criar cliente
router.post('/', upload.single('imagem'), clienteController.cadastrar)

module.exports = router