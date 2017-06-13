// Dependencies
var express = require('express');
var path = require("path");
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
// Models
var db = require("./app/models/");

// Initialize express
var app = express();
var PORT = process.env.PORT || 8080;
 
// app.get('/', function(req, res) {
//     res.send('Welcome to Passport with Sequelize');
// });
 
// For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
 
 
// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// set up static directory for all public files
app.use(express.static(path.join(__dirname , "app/views")));

// Authentication routes
var authRoute = require('./app/routes/authRoutes.js')(app, passport);

// load passport strategies
require('./app/config/passport/passport.js')(passport, db.User);
 
// Sync Database
db.sequelize.sync({force: false}).then(function() {
 
    console.log('Database looks fine.')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
});

app.listen(PORT, function(err) {
 
    if (!err) console.log("Site is live.");
    else console.log(err)
});