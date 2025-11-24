const Cliente = require('./Cliente')
const Compra = require('./Compra')
const Cupom = require('./Cupom')
const Desenvolvedor = require('./Desenvolvedor')
const Genero = require('./Genero')
const Jogo = require('./Jogo')
const Plataforma = require('./Plataforma')
const Review = require('./Review')

//// Cliente x Compra ///////
Cliente.hasMany(Compra, {
    foreignKey: 'idCliente',
    onDelete: 'CASCADE'
})

Compra.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    onUpdate: 'CASCADE'
})
////////////////////////////

/////////Jogo x Compra/////////
Jogo.hasMany(Compra, {
    foreignKey: 'idJogo',
    onDelete: 'CASCADE'
})

Compra.belongsTo(Jogo, {
    foreignKey: 'idJogo',
    onUpdate: 'CASCADE'
})
////////////////////////////

/////////Jogo x Genero/////////
Genero.hasMany(Jogo, {
    foreignKey: 'idGenero',
    onDelete: 'CASCADE'
})

Jogo.belongsTo(Genero, {
    foreignKey: 'idGenero',
    onUpdate: 'CASCADE'
})
////////////////////////////

/////////Jogo x Desenvolvedor/////////
Desenvolvedor.hasMany(Jogo, {
    foreignKey: 'idDesenvolvedor',
    onDelete: 'CASCADE'
})

Jogo.belongsTo(Desenvolvedor, {
    foreignKey: 'idDesenvolvedor',
    onUpdate: 'CASCADE'
})
////////////////////////////

/////////Jogo x Plataforma/////////
Plataforma.hasMany(Jogo, {
    foreignKey: 'idPlataforma',
    onDelete: 'CASCADE'
})

Jogo.belongsTo(Plataforma, {
    foreignKey: {
        name: 'idPlataforma',
        allowNull: true
    },
    onUpdate: 'CASCADE'
})
////////////////////////////

/////////Jogo x Reviews/////////
Jogo.hasMany(Review, {
    foreignKey: 'idJogo',
    onDelete: 'CASCADE'
})

Review.belongsTo(Jogo, {
    foreignKey: 'idJogo',
    onUpdate: 'CASCADE'
})
////////////////////////////

/////////Cliente x Reviews/////////
Cliente.hasMany(Review, {
    foreignKey: 'idCliente',
    as: 'reviews', // Mudar para nome consistente
    onDelete: 'CASCADE'
})

Review.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'cliente', // Mudar para nome consistente
    onUpdate: 'CASCADE'
})
////////////////////////////

/////////Compras x Cupons/////////
Compra.hasMany(Cupom, {
    foreignKey: 'idCompra',
    onDelete: 'CASCADE'
})

Cupom.belongsTo(Compra, {
    foreignKey: 'idCompra',
    onUpdate: 'CASCADE'
})

// Exportar todos os modelos
module.exports = {Cliente,Compra,Cupom,Desenvolvedor,Genero,Jogo,Plataforma,Review}