const { DataTypes } = require('sequelize')
const db = require('../db/conn')


const Plataforma = db.define('plataformas',{
    codPlataforma:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomePlataforma:{
        type: DataTypes.STRING(45),
        allowNull: false
    }
},{
    modelName: 'plataformas',
    timestamps: true
})

module.exports = Plataforma