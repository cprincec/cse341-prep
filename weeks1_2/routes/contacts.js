const router = require('express').Router();
const contactsController = require('../controller/contacts');

router.route('/')
    .get(contactsController.getContacts)
    .post(contactsController.createContact);

router.route('/:id')
    .get(contactsController.getContactById)
    .put(contactsController.updateContact)
    .delete(contactsController.deleteContact);


module.exports = router;