var db = require('./db');

var bookshelf = require('bookshelf')(db);



var userModel = bookshelf.Model.extend({
	tableName: 'photos'
})

module.exports = userModel;