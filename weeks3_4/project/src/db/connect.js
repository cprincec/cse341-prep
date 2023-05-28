const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

// variable to store database connection
let _db;

// function to connect database
async function main() {
    // database connection string
    const uri = process.env.URI;

    // // create instance of mongoclient wi
    // let client = new MongoClient(uri);

    try {
        // connect to database
        let connection = await mongoose.connect(uri)

        // store database connection in _db variable
        _db = connection;

    } catch (e) {
        console.error(e);
    }
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


module.exports = { main, getDb };