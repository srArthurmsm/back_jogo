const conn = require('./db/conn')
require('./model/rel') // importa TODAS as relações antes do sync

async function resetDatabase() {
    try {
        await conn.query("SET FOREIGN_KEY_CHECKS = 0")
        await conn.drop()
        await conn.sync({ force: true }) 
        await conn.query("SET FOREIGN_KEY_CHECKS = 1")

    } catch (err) {
        console.error("ERRO:", err)
    } finally {
        await conn.close()
        console.log("Conexão fechada.")
    }
}

resetDatabase()