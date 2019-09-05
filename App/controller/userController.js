var User = require("../model/userModel");

exports.user_create = function(req, res) {
    var user = req.params.username;
    var pass = req.params.password;
    User.findOrCreate({where: {username: user}, defaults: {password: pass}})
    .then(([user, created]) => {
        console.log(user.get({
            plain: true
        }))
        console.log(created)
        res.send([user,created]);
    }).catch(function(err) {
        // print the error details
        console.log(err);
    });
};

exports.user_validate = function(req, res) {
    var user = req.params.username;
    var pass = req.params.password;
    User.findOne({
        where: {username: user, password: pass}
    }).then(project => {
        console.log(project);
        res.send(project);
    });
};