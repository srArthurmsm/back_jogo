const Cliente = require('./Cliente')
const Compra = require('./Compra')
const Genero = require('./Genero')
const Jogo = require('./Jogo')
const Review = require('./Review')
const CompraItem = require('./CompraItens')


//////////
Cliente.hasMany(Compra, {
    foreignKey: 'idCliente'
});
Compra.belongsTo(Cliente, {
    foreignKey: 'idCliente'
});
//////////
Compra.hasMany(CompraItem, {
    foreignKey: 'codCompra'
});
CompraItem.belongsTo(Compra, {
    foreignKey: 'codCompra'
});
/////////
Jogo.hasMany(CompraItem, {
    foreignKey: 'idJogo'
});
CompraItem.belongsTo(Jogo, {
    foreignKey: 'idJogo'
});
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
    as: 'reviews', 
    onDelete: 'CASCADE'
})

Review.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'cliente',
    onUpdate: 'CASCADE'
})
////////////////////////////


module.exports = {Cliente,Compra,Genero,Jogo,Review, CompraItem}