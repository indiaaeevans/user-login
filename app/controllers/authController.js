var exports = module.exports = {}
var path = require("path");

// CONTROLLERS FOR USER AUTHENTICATION
exports.signup = function(req, res) {
 
    res.sendFile(path.join(__dirname, "../views/index.html"));
}

exports.signin = function(req, res) {
 
    res.sendFile(path.join(__dirname, "../views/index.html"));
}

exports.menu = function(req, res) {

	res.sendFile(path.join(__dirname, "../views/menu.html"));
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}