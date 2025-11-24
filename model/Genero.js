const { DataTypes } = require('sequelize')
const db = require('../db/conn')


const Genero = db.define('generos',{
    codGenero:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeGenero:{
        type: DataTypes.STRING(45),
        allowNull: false
    }
},{
    modelName: 'generos',
    timestamps: true
})

module.exports = Genero