const Review = require('../model/Review')
const Cliente = require('../model/Cliente')

const cadastrar = async (req,res)=>{
    const valores = req.body
    try{
        await Review.create(valores)

        res.status(200).json({message:`Os Jogos Foi cadastrado`})
    }
    catch(err){
        res.status(500).json({message:err})
    }
}

const listar = async (req,res)=>{
    try{
        const dados = await Review.findAll({
            include: [{
                model: Cliente,
                as: 'cliente',
                attributes: ['codCliente', 'nome', 'imagem']
            }]
        });
        res.status(200).json(dados)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}


module.exports = {cadastrar, listar}