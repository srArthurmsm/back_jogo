const Compra = require('../model/Compra');
const CompraItem = require('../model/CompraItens');
const Jogo = require('../model/Jogo');

const cadastrar = async (req, res) => {
    try {
        const { idCliente, idJogo, preco } = req.body;

        if (!idCliente || !idJogo || !preco) {
            return res.status(400).json({ erro: "Dados inválidos." });
        }
        const compra = await Compra.create({
            idCliente,
            valorTotal: preco
        });
        await CompraItem.create({
            codCompra: compra.codCompra,
            idJogo,
            precoItem: preco
        });

        const compraCompleta = await Compra.findOne({
            where: { codCompra: compra.codCompra },
            include: [
                {
                    model: CompraItem,
                    include: [Jogo]
                }
            ]
        });

        return res.status(201).json({
            message: "Item comprado com sucesso!",
            compra: compraCompleta
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: err.message });
    }
};

const cadastrarCarrinho = async (req, res) => {
    try {
        const { idCliente, compras } = req.body;

        if (!idCliente || !Array.isArray(compras) || compras.length === 0) {
            return res.status(400).json({ erro: "Dados inválidos." });
        }

        for (const item of compras) {
            if (!item.idJogo || !item.preco) {
                return res.status(400).json({
                    erro: "Todos os itens precisam ter idJogo e preco."
                });
            }
        }

        const compra = await Compra.create({
            idCliente,
            valorTotal: 0
        });

        const codCompra = compra.codCompra;

        // cria itens
        const itens = compras.map(item => ({
            codCompra,
            idJogo: item.idJogo,
            precoItem: item.preco
        }));

        await CompraItem.bulkCreate(itens);

        const valorTotal = itens.reduce((s, i) => s + i.precoItem, 0);

        await compra.update({ valorTotal });

        const compraCompleta = await Compra.findOne({
            where: { codCompra },
            include: [
                {
                    model: CompraItem,
                    include: [Jogo]
                }
            ]
        });

        return res.status(201).json({
            message: "Compra finalizada!",
            compra: compraCompleta
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: err.message });
    }
};

const listar = async (req, res) => {
    try {
        const dados = await CompraItem.findAll({
            include: [
                Jogo,
                Compra
            ]
        });

        return res.status(200).json(dados);
    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
};

module.exports = { cadastrar, cadastrarCarrinho, listar };
