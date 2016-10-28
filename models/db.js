require('dotenv').config();
var db = require('knex')({
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'admin',
		password: 'jessie',
		database: 'artsy'
	}

});


module.exports = db;