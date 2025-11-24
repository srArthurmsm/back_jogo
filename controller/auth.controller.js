const Cliente = require('../model/Cliente')
const jwt = require('../service/jwt.service')
const bcrypt = require('../service/bcrypt.service')


const Login = async (req,res)=>{
    const valores = req.body

    const dados = await Cliente.findOne({where:{email:valores.email}})

    if(!dados){
        return res.status(404).json({message:"o usuario não existe"})
    }
    if(bcrypt.compararSenha(valores.senha,dados.senha)){
        const cliente = dados.get({ plain: true })
        const tokenGerado = jwt.gerarToken(cliente)
        res.status(200).json({message:`Bem Vindo ${cliente.nome}`, token: tokenGerado})
    } else{
        res.status(500).json({message:'a senha esta errada'})
    }
}


module.exports = {Login}