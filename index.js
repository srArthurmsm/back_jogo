require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')

const conn = require('./db/conn')
require('./model/rel')

const PORT = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Criar pasta uploads
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads')
app.use('/uploads', express.static('uploads'))

/* ===== ROTAS ORGANIZADAS ===== */
app.use('/cliente', require('./routes/cliente.routes'))
app.use('/jogo', require('./routes/jogo.routes'))
app.use('/genero', require('./routes/genero.routes'))
app.use('/compra', require('./routes/compra.routes'))
app.use('/review', require('./routes/review.routes'))
app.use('/auth', require('./routes/auth.routes'))

/* ROTA PRINCIPAL */
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Servidor rodando' })
})

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
