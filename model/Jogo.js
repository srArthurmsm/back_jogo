const { DataTypes } = require('sequelize')
const db = require('../db/conn')



const Jogo = db.define('jogos',{
    codJogo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idGenero:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model:'generos',
            key:'codGenero'
        }
    },
    idPlataforma:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model:'plataformas',
            key:'codPlataforma'
        }
    },
    idDesenvolvedor:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model:'desenvolvedores',
            key:'codDev'
        }
    },
    DataLancamento:{
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    nomeJogo:{
        type: DataTypes.STRING(63),
        allowNull: false
    },
    preco:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descricao:{
        type: DataTypes.STRING(63),
        allowNull: false
    },
    capa:{
        type: DataTypes.STRING(127),
        allowNull: true
    },
    requisitosMinimos:{
        type: DataTypes.STRING(127),
        allowNull: true,
    },
    requisitosRecomendados:{
        type: DataTypes.STRING(127),
        allowNull: true,
    }
},{
    modelName: 'jogos',
    timestamps: true
})

module.exports = Jogo