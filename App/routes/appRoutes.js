var express = require('express');
var router = express.Router();

var user_contr = require('../controller/userController');
var board_contr = require('../controller/boardsController');
var note_contr = require('../controller/noteController');

router.get('/login/:username/:password', user_contr.user_validate);

router.get('/login/createAccount/:username/:password', user_contr.user_create);

router.get('/boardMenu/load/:user_id', board_contr.board_load);

router.get('/boardMenu/create/:user_id/:name', board_contr.board_create);

router.get('/boardMenu/update/:board_id/:name/:color', board_contr.board_update);

router.get('/noteBoard/load/:board_id/:user_id', note_contr.note_load);

router.get('/noteBoard/create/:board_id/:user_id', note_contr.note_create);

router.get('/noteBoard/update/:note_id/:x/:y/:color/:title/:text/:deleted', note_contr.note_update);

module.exports = router;