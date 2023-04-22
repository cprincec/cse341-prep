const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
// const contactsData = require('../contacts.json');


async function getContacts(req, res) {
    let col = returnCollection('webservices', 'contacts');
    let contacts = await col.find({});
    contacts.toArray()
    .then(contactsList => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contactsList);
    })
}

async function getContactById(req, res) {
    let col = returnCollection('webservices', 'contacts');
    let contact = await col.find({_id: new ObjectId(req.params.id)});
    console.log(contact);
    contact.toArray()
    .then(contactList => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contactList);
    })
}

// async function addContacts(req, res) {
//     // check if contacts collection exists in the database
//     // create one if it doesn't exist
//     console.log(await returnCollection('webservices').collectionNames());
//     if (!returnCollection('webservices', 'contacts')) {
//         console.log("There is no contacts collection")
//         await createContactsCollection();
//         console.log("There is no contacts collection")
//     }  
//     console.log("There is no contacts collection")
//     let col = returnCollection('webservices', 'contacts');
//     let result = await col.insertMany("contacts", {contactsData});
//     res.send("Added successfully", result);
// }

// async function createContactsCollection() {
//     let db = returnCollection('webservices');
//     await db.createCollection('contacts', {
//         validator: {
//             $jsonSchema: {
//                bsonType: "object",
//                title: "Contscts Object Validation",
//                required: [ "firstName", "lastName", "email", "favoriteColor", "birthday" ],
//                properties: {
//                 firstName: {
//                      bsonType: "string",
//                      description: "'firstname' is required"
//                   },
//                   lastName: {
//                     bsonType: "string",
//                     description: "'lastName' is required"
//                  },
//                  email: {
//                     bsonType: "string",
//                     description: "'email' is required"
//                  },
//                  favoriteColor: {
//                     bsonType: "string",
//                     description: "'favoriteColor' is required"
//                  },
//                   birthday: {
//                     bsonType: "string",
//                     description: "'birthday' is required"
//                   },
//                }
//             }
//          }
//     })
// }

// This function simplifies the number of text I have to write 
// when interacting with mongodb.
// It saves me from having to type something like this:
// mongodb.getDb().db('webservices').collection('users')
function returnCollection(dbname, collection) {
    if (!collection) {
        let db = mongodb.getDb().db(dbname);
        return db;
    }
    let db = mongodb.getDb().db(dbname);
    let col = db.collection(collection);
    return col;
}


module.exports = { getContacts, getContactById };