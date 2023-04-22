const express = require('express');
const router = express.Router();
const indexController = require('../controller/index')

router.use('/contacts', require('./contacts'));
router.get('/', indexController.displayName);

module.exports = router;