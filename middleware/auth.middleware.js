const jwt = require('../service/jwt.service')



const middleware = async (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' })
    }
    const verificado = jwt.verificarToken(token)
    if (!verificado) {
      return res.status(403).json({ message: 'Token inválido ou expirado' })
    }
    req.usuario = verificado
    next()
}

const ranking = async (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' })
    }
    const verificado = jwt.verificarToken(token)
    if (!verificado) {
      return res.status(403).json({ message: 'Token inválido ou expirado' })
    }

    const payload = JSON.parse(atob(token.split('.')[1]))

    if (payload.rank != "DEV"){
      return res.status(401).json({message: 'voce é de rank baixo pdo necessario'})
    }
    next()
}

module.exports = {middleware, ranking}