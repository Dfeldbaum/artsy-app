var express = require('express');
var ctrl = express.Router();

// require user model
var User = require('../models/userModel');
var bcrypt = require('bcryptjs');


// home/login page
ctrl.get('/', renderLoginPage)
// register page
ctrl.get('/register', renderRegisterPage)
// profile page
ctrl.get('/profilepage', renderProfilePage)



ctrl.post('/register/success', attemptToRegister);
ctrl.post('/', attemptToLogin);





function renderLoginPage(req, res, next) {
	res.render('index', { title: 'Artsy'});
};	




function renderRegisterPage (req, res, next) {
	res.render('register', {})
};

// function renderProfilePage (req, res, next) {
// 	res.render('profilepage', { title: 'Artsy' })
// };


function renderProfilePage(req, res, next){
	// res.render('profilepage')
	console.log(req.session)
 User.where({username: req.session.theResultFromOurModelInsertion}).fetch().then(
     function(result) {
   console.log(result.attributes);
       res.render('profilepage' , result.attributes);
     })
     .catch(function(error) {
       console.log(error)
     });
}



function attemptToRegister(req, res, next) {
	console.log(req.body);
	// first, we need an user model
	// a user with a form would pass in req.body
	// { username: '', password_hash: ''}
	var password = req.body.password_hash;
	var hashedPassword = createPasswordHash(password);
	var account = new User({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		username: req.body.username,
		password_hash: hashedPassword
	}).save().then(function(result) {
		req.session.theResultFromOurModelInsertion = result.attributes.username

		//res.render
		// res.json(result); 
		res.redirect('/profilepage')
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
	console.log(password)

	console.log(req.body.username, 'this is username')
	User.where({username: req.body.username}).fetch().then(
		function(result) {
			// res.send('hi')
			var attempt = comparePasswordHashes(req.body.password_hash, result.attributes.password_hash);
			// then we share the results
			// res.json({'is_logged_in': attempt });
			console.log(result)
			console.log(attempt, ' this is attempt')
			if (attempt === true) {
			req.session.theResultFromOurModelInsertion = result.attributes.username
			res.redirect('/profilepage')
			}
			else {
				res.redirect('/')
			}

		}
	)
};




module.exports = ctrl;





