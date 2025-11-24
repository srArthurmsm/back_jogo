const {Cliente, Compra, Cupom, Desenvolvedor,Genero, Jogo, Plataforma, Review} = require('./model/rel')
const conn = require('./db/conn')

async function SyncDataBase(){
    try{
        await conn.sync({alter:true})
    }
    catch(err){
        console.error('erro', err)
    }
    finally{
        conn.close()
    }
}

SyncDataBase()