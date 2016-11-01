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

var bookshelf = require('bookshelf')(db)

bookshelf.plugin('registry');

module.exports = bookshelf;