const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Cliente = require('./Cliente')
const Jogo = require('./Jogo')

const Review = db.define('reviews',{
    codReview:{
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
    Conteudo:{
        type: DataTypes.STRING(45),
        allowNull: false
    }
},{
    modelName: 'reviews',
    timestamps: true
})

module.exports = Review