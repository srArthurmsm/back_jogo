const conn = require('./db/conn')

async function SyncDataBase() {
    try {
        await conn.query('SET FOREIGN_KEY_CHECKS = 0');
        await conn.sync({ force: true });
        await conn.query('SET FOREIGN_KEY_CHECKS = 1');
    } catch (err) {
        console.error("Erro:", err);
    } finally {
        await conn.close();
    }
}

SyncDataBase();