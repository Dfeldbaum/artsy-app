var express = require('express');
var ctrl = express.Router();

// require user model
var User = require('../models/userModel');
var bcrypt = require('bcryptjs');



ctrl.get('/', function(req, res, next) {
	res.render('index', {})

});


ctrl.post('/profilepage', attemptToRegister);
ctrl.post('/', attemptToLogin);



function attemptToRegister(req, res, next) {
	console.log(req.body);
	// first, we need an user model
	// a user with a form would pass in req.body
	// { username: '', password_hash: ''}
	var password = req.body.password_hash;
	var hashedPassword = createPasswordHash(password);
	var account = new User({
		username: req.body.username,
		password_hash: hashedPassword
	}).save().then(function(result) {
		//res.render
		res.json(result); // res.redirect(/home)
	});
};

function createPasswordHash (password) {
	var salt = 10; // salt factor of 10
	var hash = bcrypt.hashSync(password, salt);
	return hash;
};

function comparePasswordHashes (input, db) {
	//input: user's attempted to login
	var hash = createPasswordHash(input);
	return bcrypt.compareSync(input, db);
};

function attemptToLogin(req, res, next) {
	var password = req.body.password_hash;
	// who is our user?
	Account.where('username', req.body.username).fetch().then(
		function(result) {
			var attempt = comparePasswordHashes(req.body.password_hash, result.attributes.password_hash);
			// then we share the results
			res.json({'is_logged_in': attempt });
		}
	)
};




module.exports = ctrl;


