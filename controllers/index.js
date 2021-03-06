var express = require('express');
var ctrl = express.Router();

// require user model
var UserModel = require('../models/userModel');
var photoModel = require('../models/photoModel');
var bcrypt = require('bcryptjs');


// foreign key relationship
ctrl.get('/foreignKey', function(req, res, next){
	UserModel.where({id: 1}).fetch({withRelated: ['photos']})
	.then(function(user){
		res.json(user.related('photos'))
	})
});


// home/login page
ctrl.get('/', renderLoginPage)
// register page
ctrl.get('/register', renderRegisterPage)
// profile page
ctrl.get('/profilepage', renderProfilePage) // add renderUserImages callback
// logout page
ctrl.get('/logout', function(req, res, next){
    req.session=null;
    res.redirect('/');
});



ctrl.post('/register/success', attemptToRegister);
ctrl.post('/', attemptToLogin);
// trigger uploadPhoto
ctrl.post('/upload', uploadPhoto);




// functions
function uploadPhoto(req, res, next){
	console.log(req.session)
	console.log(req.body, ' this is req.bdoy')
    var photo = new photoModel({
    	user_id: req.session.user_id,
    	image_as_base64: req.body.image_as_base64,
        photo_name: req.body.photo_name,
        photo_price: req.body.photo_price
    }).save();
    res.redirect('/profilepage')
}




// function renderUserImages(req, res, next) {
// 	// call collection of rows (table)
// 	photoModel.collection().fetch().then(function(result) {
// 		// res.render('all', models);
// 		res.json(result);
// 	});
// };

	// photoModel.where({id: 8}).fetch({withRelated: ['photos']})
	// .then(function(user){
	// 	res.json(user.related('photos'))
	// })



function renderLoginPage(req, res, next) {
	res.render('index', { title: 'Artsy'});
};	


function renderRegisterPage (req, res, next) {
	console.log(req.body.session)
	res.render('register', {})
};



function renderProfilePage(req, res, next){
	// res.render('profilepage')

	console.log(req.session)
	
// UserModel.where({username: req.session.theResultFromOurModelInsertion}).fetch().then(
//     function(result) {

	UserModel.where({id: req.session.user_id}).fetch({withRelated: 'photos'})
		.then(function(photo){

		
			var viewModel = {
				photoUpload: photo.related('photos').models,
				username: req.session.theResultFromOurModelInsertion
			}

			console.log('----------------------------------------------------------------')
			console.log(photo)
			console.log(viewModel.photoUpload.length)
			console.log('----------------------------------------------------------------')

			if (viewModel.photoUpload.length === 0){
				console.log()
				res.render('profilepage', {username: req.session.theResultFromOurModelInsertion})
			}
			else {
				res.render('profilepage', viewModel)
			}
			
			// res.send('hi')

	})


 	// UserModel.where({username: req.session.theResultFromOurModelInsertion}).fetch().then(
  //   function(result) {
    	
  //   	photoModel.where({user_id: 8}).fetch().then(
  //   		function(results) {
  //   			// view model

  //   			var viewModel = {}

  //   			// loop through viewModel
  //   			console.log('----------------------------------------------------------------')


  //   			console.log(results)

  //   			console.log('----------------------------------------------------------------')
  //   			res.render('profilepage' , viewModel); // results.attributes
  //   		})



  //  		console.log(result.attributes);

  //    })
  //    .catch(function(error) {
  //      	console.log(error)
     // };
 
};


function attemptToRegister(req, res, next) {
	console.log(req.body);
	// first, we need an user model
	// a user with a form would pass in req.body
	// { username: '', password_hash: ''}
	var password = req.body.password_hash;
	var hashedPassword = createPasswordHash(password);
	var account = new UserModel({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		username: req.body.username,
		password_hash: hashedPassword
	}).save().then(function(result) {
		req.session.theResultFromOurModelInsertion = result.attributes.username
		req.session.user_id = result.attributes.id
		//res.render
		//res.json(result); 
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
	UserModel.where({username: req.body.username}).fetch().then(
		function(result) {
			// res.send('hi')
			var attempt = comparePasswordHashes(req.body.password_hash, result.attributes.password_hash);
			// then we share the results
			// res.json({'is_logged_in': attempt });
			console.log(result)
			console.log(attempt, ' this is attempt')
			if (attempt === true) {
			req.session.theResultFromOurModelInsertion = result.attributes.username
			req.session.user_id = result.attributes.id
			res.redirect('/profilepage')
			}
			else {
				res.redirect('/')
			}

		}
	)
};



module.exports = ctrl;
