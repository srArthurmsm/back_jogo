const Cliente = require('../model/Cliente')
const bcrypt = require('../service/bcrypt.service')


const cadastrar = async (req,res)=>{
    const valores = req.body
    try{
        const hashSenha = await bcrypt.criarSenha(valores.senha)
        console.log(hashSenha)

        if (req.file) {
            const filePath = req.file.path.replace(/\\/g, "/");
            valores.imagem = "/" + filePath;
        }

        const dados = await Cliente.create({
            nome: valores.nome,
            DataNascimento: valores.DataNascimento,
            telefone: valores.telefone,
            email: valores.email,
            senha: hashSenha,
            imagem: valores.imagem,
            rank: valores.rank,
        })
        res.status(200).json({message:`O Cliente ${valores.nome} Foi cadastrado`})
    }
    catch(err){
        console.error("Erro no cadastro:", err);
        res.status(500).json({message:"O Cliente não Foi cadastrado"})
    }
}




module.exports = {cadastrar}