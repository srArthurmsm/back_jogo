const Jogo = require('../model/Jogo')

const cadastrar = async (req,res)=>{
    const valores = req.body
    try{
        await Jogo.bulkCreate(valores)
        res.status(200).json({message:`Os Jogos Foi cadastrado`})
    }
    catch(err){
        res.status(500).json({message:err})
    }
}

const listar = async (req,res)=>{
    try{
        dados = await Jogo.findAll()
        res.status(200).json(dados)
    }
    catch(err){
        res.status(500).json({message:"Os Jogos não Foi cadastrado"})
    }
}

const findByID = async (req,res)=>{
    const id = req.params.id
    try{
        dados = await Jogo.findByPk(id)
        res.status(200).json(dados)
    }
    catch(err){
        res.status(500).json({message:"Os Jogos não Foi cadastrado"})
    }
}

module.exports = {cadastrar, listar, findByID}