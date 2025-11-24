const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('db_steam', 'root', 'senai',{
    dialect:'mysql',
    port: 3306,
    host: 'localhost'
})


sequelize.authenticate()
.then(()=>{
    console.log('esta rodando')
})
.catch((err)=>{
    console.error('não esta rodando', err)
})

module.exports = sequelize