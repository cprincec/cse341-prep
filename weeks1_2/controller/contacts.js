const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// const contactsData = require('../contacts.json');


async function getContacts(req, res) {
    let col = returnCollection();
    let contacts = await col.find({});
    contacts.toArray()
    .then(contactsList => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contactsList);
    })
}

async function getContactById(req, res) {
    let col = returnCollection();
    let contact = await col.find({_id: new ObjectId(req.params.id)});
    console.log(contact);
    contact.toArray()
    .then(contactList => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contactList);
    })
}



async function createContact(req, res) {
    const contact = {
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    let col = returnCollection();
    let result = await col.insertOne(contact);
    if (result.acknowledged) {
        res.status(201).json(result.insertedId)
    } else {
        res.status(500).json(result.error || 'Some error occurred while creating the contact.');
    }
}

async function updateContact(req, res) {
    const id = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      };  
      let col = returnCollection();
      let result = await col.replaceOne({_id: id}, contact)
      console.log(result)
      if (result.modifiedCount) {
        res.status(204).send()
    } else {
        res.status(500).json(result.error || 'Some error occurred while updating the contact.');
    }
    
}
async function deleteContact(req, res) {
    const id = new ObjectId(req.params.id);
      let col = returnCollection();
      let result = await col.deleteOne({_id: id})
      if (result.deletedCount) {
        res.status(200).send()
    } else {
        res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
    }
}

// async function addContacts(req, res) {
//     // check if contacts collection exists in the database
//     // create one if it doesn't exist
//     console.log(await returnCollection('webservices').collectionNames());
//     if (!returnCollection()) {
//         console.log("There is no contacts collection")
//         await createContactsCollection();
//         console.log("There is no contacts collection")
//     }  
//     console.log("There is no contacts collection")
//     let col = returnCollection();
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
function returnCollection(dbname = "webservices", collection = "contacts") {
    if (!collection) {
        let db = mongodb.getDb().db(dbname);
        return db;
    }
    let db = mongodb.getDb().db(dbname);
    let col = db.collection(collection);
    return col;
}

module.exports = { getContacts, getContactById, createContact, updateContact, deleteContact };