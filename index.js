require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')

const conn = require('./db/conn')
require('./model/rel')

const PORT = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'

// Controllers
const clienteController = require('./controller/cliente.controller')
const jogoController = require('./controller/jogo.controller')
const compraController = require('./controller/compra.controller')
const reviewController = require('./controller/review.controller')
const authController = require('./controller/auth.controller')
const middleware = require('./middleware/auth.middleware')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// uploads folder
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads')
app.use('/uploads', express.static('uploads'))

/* ROTAS ABERTAS */
app.get('/', (req,res)=>{
    res.status(200).json({message:'API rodando'})
})

app.post('/cliente', require('./config/uploadConfig').single('imagem'), clienteController.cadastrar)
app.post('/login', authController.Login)
app.get("/jogo", jogoController.listar)
app.get("/jogo/:id", jogoController.findByID)
app.get("/review", reviewController.listar)

/* ROTAS COM TOKEN */
app.use(middleware.middleware)

app.post('/review', reviewController.cadastrar)
app.post('/compra', compraController.cadastrar)
app.post('/compra/carrinho', compraController.cadastrarCarrinho)
app.get('/compra', compraController.listar)

/* ROTAS APENAS PARA DEV */
app.use(middleware.ranking)
app.post("/jogo", jogoController.cadastrar)

/* START SERVER */
async function startServer() {
  try {
    console.log("NODE_ENV:", process.env.NODE_ENV)

    if (!isProduction) {
      await conn.sync()
      console.log('DB sincronizado (dev)')
    } else {
      await conn.authenticate()
      console.log('DB autenticado (produção)')
    }

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  } catch (err) {
    console.error('Erro ao iniciar servidor:', err)
    process.exit(1)
  }
}

startServer()
