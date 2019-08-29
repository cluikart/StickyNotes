var Board = require('../model/boardsModel');

exports.board_load = function(req, res) {
    var user_id = req.params.user_id;
    
    Board.findAll({
        where: {user_id: user_id}
    }).then(boards => {
        console.log(boards);
        res.send(boards);
    });
};


exports.board_create = function(req, res) {
    var user_id = req.params.user_id;
    var name = req.params.name;

    Board.create({
        user_id: user_id,
        name: name,
        color: '#FFFFFF',
        deleted: false,
    }).then(board => {
        console.log(board);
        res.send(board);
    });
};

exports.board_update = function(req, res) {
    var board_id = req.params.board_id;
    var color = req.params.color;
    var name = req.params.name;
    
    Board.update({
       
        color: color,
        name: name
    }, {returning: true, where: {board_id: board_id}}).then(board => {
        res.send(board);
    })
}