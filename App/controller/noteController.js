var Note = require('../model/noteModel');


exports.note_load = function(req, res) {
    var user_id = req.params.user_id;
    var board_id = req.params.board_id;
    
    Note.findAll({
        where: {user_id: user_id}, board_id: board_id
    }).then(notes => {
        console.log(notes);
        res.send(notes);
    });
};

exports.note_update = function(req, res) {
    var note_id = req.params.note_id;
    var color = req.params.color;
    var x = req.params.x;
    var y = req.params.y;
    var title = req.params.title;
    var text = req.params.text;
    Note.update({
        x: x,
        y: y,
        color: color,
        title: title,
        text: text
    }, {returning: true, where: {note_id: note_id}}).then(note => {
        res.send(note);
    })
}

exports.note_create = function(req, res) {
    var user_id = req.params.user_id;
    var board_id = req.params.board_id;

    Note.create({
        user_id: user_id,
        board_id: board_id,
        x: 100,
        y: 100,
        color: '#FFFFFF',
        deleted: false,
    }).then(note => {
        console.log(note);
        res.send(note);
    });
};

