const { DataTypes } = require('sequelize')
const db = require('../db/conn')


const Cupom = db.define('cupons',{
    codCupom:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCompra:{
        type: DataTypes.INTEGER,
        references:{
            key:'codCompra',
            model:'compras'
        }
    },
    codigo:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    porcentagemDesconto:{
        type: DataTypes.FLOAT,
        allowNull: true
    },
    validade:{
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},{
    modelName: 'cupons',
    timestamps: true
})

module.exports = Cupom