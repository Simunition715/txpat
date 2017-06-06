var mongoose = require('mongoose');
var fs = require('fs');
var models_path = __dirname + '/../models';

console.log('connecting to db...');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/txpats12');




fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('js')!= -1){
		console.log('loading'+ file + '...');
		require(models_path + '/' + file)
	}
})