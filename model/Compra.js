const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Compra = db.define('compras', {
    codCompra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    },
    DataCompra: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    valorTotal: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    modelName: 'compras',
    timestamps: true
});

module.exports = Compra;