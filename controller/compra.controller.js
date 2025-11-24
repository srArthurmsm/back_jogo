const Compra = require('../model/Compra')

const cadastrar = async (req,res)=>{
    const valores = req.body
    try{
        await Compra.create(valores)
        res.status(200).json({message:`A Compra Foi cadastrado`})
    }
    catch(err){
        res.status(500).json({message:err})
    }
}

const cadastrarCarrinho = async (req,res)=>{
    const valores = req.body
    try{
        await Compra.bulkCreate(valores)
        res.status(200).json({message:`As Compras Foram cadastradas`})
    }
    catch(err){
        res.status(500).json({message:err})
    }
}

const listar = async (req,res)=>{
    try{
        dados = await Compra.findAll()
        res.status(200).json(dados)
    }
    catch(err){
        res.status(500).json({message:err})
    }
}


module.exports = {cadastrar, cadastrarCarrinho, listar}