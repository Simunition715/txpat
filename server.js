var express = require('express');
var bp = require('body-parser');
var session = require('express-session');



var app = express();

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/client'));
app.use(session({
	secret:'secret',
	resave:false,
	saveUninitialized:true,
	rolling:true
}))

app.use(bp.json());


require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000,function(){
	console.log("listening on port 8000....");
})