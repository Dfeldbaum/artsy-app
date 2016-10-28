var db = require('./db');

var bookshelf = require('bookshelf')(db);



var userModel = bookshelf.Model.extend({
	tableName: 'users'
})

module.exports = userModel;




