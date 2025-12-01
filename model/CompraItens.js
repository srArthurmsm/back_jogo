const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const CompraItem = db.define('compra_itens', {
    idItem: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codCompra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'compras',
            key: 'codCompra'
        }
    },
    idJogo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'jogos',
            key: 'codJogo'
        }
    },
    precoItem: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    modelName: 'compra_itens',
    timestamps: false
});

module.exports = CompraItem;