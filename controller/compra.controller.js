const Compra = require('../model/Compra');
const CompraItem = require('../model/CompraItens');
const Jogo = require('../model/Jogo');

const cadastrar = async (req, res) => {
    try {
        await Compra.create(req.body)
        return res.status(200).json({ message: "Compra cadastrada" })
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

const cadastrarCarrinho = async (req, res) => {
    try {
        const { idCliente, compras } = req.body

        if (!idCliente || !Array.isArray(compras) || compras.length === 0) {
            return res.status(400).json({ erro: "Dados inválidos." })
        }
        const compra = await Compra.create({
            idCliente,
            valorTotal: 0
        })

        const codCompra = compra.codCompra

        const itensParaCriar = compras.map(item => ({
            codCompra: codCompra,
            idJogo: item.idJogo,
            precoItem: item.preco
        }))

        await CompraItem.bulkCreate(itensParaCriar);

        const valorTotal = itensParaCriar.reduce((s, i) => s + i.precoItem, 0)

        await Compra.update(
            { valorTotal },
            { where: { codCompra } }
        )
        const compraCompleta = await Compra.findOne({
            where: { codCompra },
            include: [
                {
                    model: CompraItem,
                    include: [Jogo]
                }
            ]
        })
        return res.status(201).json({
            message: "Compra finalizada!",
            compra: compraCompleta
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ erro: err.message })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await CompraItem.findAll({
            include: [
                {
                    model: Jogo,
                },
                {
                    model: Compra,
                }
            ]
        })

        return res.status(200).json(dados)
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
};

module.exports = {cadastrar,cadastrarCarrinho,listar}