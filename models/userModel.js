var bookshelf = require('./db');

require('./photoModel');



var userModel = bookshelf.Model.extend({
	tableName: 'users',
	photos: function(){
		return this.hasMany('photoModel')
	}

});

module.exports = bookshelf.model('userModel', userModel);




