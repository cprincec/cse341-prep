const connection = require('../db/connect');


async function createUser(req, res) {
    let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password, 
        phoneNumber: req.body.phoneNumber
    }
    let col = returnCollection("ecommerce", "users");

    result = await col.insertOne(user);
    if (result.acknowledged) {
        res.status(201).json(result.insertedId);
    } else {
        res.status(500).json(result.error || 'Some error occurred while creating the contact.');
    }
}


function returnCollection(dbname = "ecommerce", collection = "shops") {
    return connection.getDb().db(dbname).collection(collection);
}


module.exports = { createUser }