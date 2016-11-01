var bookshelf = require('./db');

require('./userModel');

var photoModel = bookshelf.Model.extend({
	tableName: 'photos',
	users: function(){
		return this.belongsTo('userModel')
	}
});

module.exports = bookshelf.model('photoModel', photoModel);