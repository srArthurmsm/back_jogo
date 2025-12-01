const Genero = require('../model/Genero')

const cadastrar = async (req,res)=>{
    const valores = req.body
    try{
        const dados = await Genero.create(valores)
        res.status(200).json({message:`O Genero Foi cadastrado`})
    }
    catch(err){
        console.error("Erro no cadastro:", err);
        res.status(500).json({message:"O Genero não Foi cadastrado"})
    }
}

const listar = async (req,res)=>{
    try{
        dados = await Genero.findAll()
        res.status(200).json(dados)
    }
    catch(err){
        res.status(500).json({message:"Os Jogos não Foi cadastrado"})
    }
}

module.exports = {cadastrar, listar}