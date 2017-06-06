var Users = require('../controllers/users');
var Posts = require('../controllers/posts');

module.exports = function(app){
	app.get('/users',Users.index);
	app.post('/users',Users.create);
	app.get('/session',Users.session);
	app.post('/session',Users.login);
	app.post('/posts',Posts.create);
	app.get('/posts',Posts.index);
	app.get('/post/:id',Posts.single);
	app.get('/destroy/:id',Posts.destroy);
	app.put('/like/:id',Posts.like);
	app.post('/comment',Posts.comment);
	app.get('/myposts/:id',Posts.myindex);
}