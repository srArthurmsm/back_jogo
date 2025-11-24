const express = require('express')
const app = express()
const cors = require('cors')
const conn = require('./db/conn')
const PORT = 3000
const HOST = "localhost"

const upload = require('./config/uploadConfig')
require('./model/rel')


const clienteController = require('./controller/cliente.controller')
const jogoController = require('./controller/jogo.controller')
const compraController = require('./controller/compra.controller')
const reviewController = require('./controller/review.controller')
const authController = require('./controller/auth.controller')
const middleware = require('./middleware/auth.middleware')



app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))


app.post('/cliente', upload.single('imagem'), clienteController.cadastrar)
app.post('/login', authController.Login)
app.get("/jogo", jogoController.listar)
app.get("/jogo/:id", jogoController.findByID)
app.get("/review", reviewController.listar)

app.get('/', (req,res)=>{
    res.status(200).json({message:'esta rodando'})
})

app.use(middleware.middleware)

app.post('/review', reviewController.cadastrar)
app.post('/compra', compraController.cadastrar)
app.post('/compra/carrinho', compraController.cadastrarCarrinho)
app.get('/compra', compraController.listar)

app.use(middleware.ranking)

app.post("/jogo", jogoController.cadastrar)

conn.sync()
.then(()=>{
    app.listen(PORT,HOST,()=>{
        console.log(`esta rodando em: http://${HOST}:${PORT}`)
    })
})
.catch((err)=>{
    console.error(err)
})