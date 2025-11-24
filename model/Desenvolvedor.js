const { DataTypes } = require('sequelize')
const db = require('../db/conn')


const Desenvolvedor = db.define('desenvolvedores',{
    codDev:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeDev:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    numeroFuncionario:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    modelName: 'desenvolvedores',
    timestamps: true
})

module.exports = Desenvolvedor