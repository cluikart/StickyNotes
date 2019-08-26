var express = require('express');
var router = express.Router();

var user_contr = require('../controller/userController');
var board_contr = require('../controller/boardsController');

router.get('/login/:username/:password', user_contr.user_validate);

router.get('/login/createAccount/:username/:password', user_contr.user_create);

router.get('/boardMenu/load/:user_id', board_contr.board_load);

router.get('/boardMenu/create/:user_id/:name', board_contr.board_create);

module.exports = router;