const { DataTypes } = require('sequelize')
const db = require('../db/conn')


const Compra = db.define('compras',{
    codCompra:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCliente:{
        type: DataTypes.INTEGER,
        references:{
            model:'clientes',
            key:'codCliente'
        }
    },
    idJogo:{
        type: DataTypes.INTEGER,
        references:{
            model:'jogos',
            key:'codJogo'
        }
    },

    DataCompra:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    valorTotal:{
        type: DataTypes.FLOAT,
        allowNull: true
    }
},{
    modelName: 'compras',
    timestamps: true
})

module.exports = Compra