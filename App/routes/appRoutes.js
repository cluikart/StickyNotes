var express = require('express');
var router = express.Router();

var user_contr = require('../controller/userController');

router.get('/:username/:password', user_contr.user_validate);

router.get('/createAccount/:username/:password', user_contr.user_create);

module.exports = router;