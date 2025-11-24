const bcrypt = require('bcrypt')

SALTOS = 10

const criarSenha = async (senha)=>{
    return bcrypt.hash(senha, 10)
}

const compararSenha = async (senha,hash)=>{
    return bcrypt.compare(senha, hash)
}

module.exports = {criarSenha, compararSenha}