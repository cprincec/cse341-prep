const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let _db;

function intiDb(callback) {
    if (_db) {
        console.log("Db is already initialized!");
        return callback(null, _db);
    }

    MongoClient.connect(process.env.URI)
        .then(client => {
            _db = client;
            callback(null, _db);
        }) .catch(err => {
            callback(err);
        })
}

function getDb() {
    if (!_db) {
        throw Error("Database not connected.")
    } else {
        return _db
    }
}

// function to print list of databases in a cluster
async function listDatabases(client) {
    let databasesList = await client.db().admin().listDatabases();

    console.log("Databases:\n");
    databasesList.databases.forEach(db => { console.log(`-${db.name}`);});
    console.log("\n");
}

module.exports = { intiDb, getDb };









// // variable to store database connection
// let _db;

// // function to connect database
// async function main() {
//     // database connection string
//     const uri = process.env.URI;

//     // create instance of mongoclient wi
//     let client = new MongoClient(uri);

//     try {
//         // connect to database
//         await client.connect();
//         await listDatabases(client)

//         // store database connection in _db variable
//         _db = client;

//     } catch (e) {
//         console.error(e);
//     }
// }




