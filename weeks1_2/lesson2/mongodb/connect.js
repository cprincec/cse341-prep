const { MongoClient } = require('mongodb');
require('dotenv').config();



async function main() {
    console.log("Inside main")
    const url = `mongodb+srv://chukwuprincec:${process.env.DB_PASS}@cluster0.tjr3mfm.mongodb.net/?retryWrites=true&w=majority`;
    let client = new MongoClient(url);
    console.log(url);

    try {
        await client.connect();
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
       await client.close();
    }
    console.log("connected");
}

async function listDatabases(client) {
    let databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => { console.log(`-${db.name}`);});
}


module.exports = { main };