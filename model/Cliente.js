const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const { ranking } = require('../middleware/auth.middleware')


const Cliente = db.define('clientes',{
    codCliente:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING(63),
        allowNull: false
    },
    DataNascimento:{
        type: DataTypes.DATE,
        allowNull: false
    },
    telefone:{
        type: DataTypes.STRING(63),
        allowNull: true
    },
    email:{
        type: DataTypes.STRING(63),
        allowNull: false,
        unique: true
    },
    senha:{
        type: DataTypes.STRING(127),
        allowNull: false
    },
    rank:{
        type: DataTypes.ENUM("NORMAL", "DEV"),
        allowNull: false
    },
    imagem:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    modelName: 'clientes',
    timestamps: true
})

module.exports = Cliente