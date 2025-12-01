require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')

const conn = require('./db/conn')
require('./model/rel')

const upload = require('./config/uploadConfig')

const PORT = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'

const clienteController = require('./controller/cliente.controller')
const generoController = require('./controller/genero.controller')
const jogoController = require('./controller/jogo.controller')
const compraController = require('./controller/compra.controller')
const reviewController = require('./controller/review.controller')
const authController = require('./controller/auth.controller')
const middleware = require('./middleware/auth.middleware')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads')
app.use('/uploads', express.static('uploads'))

app.post('/cliente', upload.single('imagem'), clienteController.cadastrar)
app.post("/jogo", upload.single('capa'), middleware.middleware,middleware.ranking,jogoController.cadastrar)
app.post("/jogo/lote" ,upload.array('capas', 10), middleware.middleware ,middleware.ranking,jogoController.cadastrarLote)

app.post('/login', authController.Login)
app.get("/jogo", jogoController.listar)
app.get("/jogo/:id", jogoController.findByID)
app.get("/review", reviewController.listar)

app.get('/', (req,res)=>{
    res.status(200).json({message:'esta rodando'})
})

app.post('/review', middleware.middleware, reviewController.cadastrar)
app.post('/compra', middleware.middleware,compraController.cadastrar)
app.post('/compra/carrinho', middleware.middleware,compraController.cadastrarCarrinho)
app.get('/compra', middleware.middleware,compraController.listar)
app.post('/genero', middleware.middleware,middleware.ranking, generoController.cadastrar)
app.get('/genero', middleware.middleware,middleware.ranking, generoController.listar)


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
