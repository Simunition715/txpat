app.factory('UserFactory', function($http){
	var factory = {};
	factory.current_user = {};
	//puts user in session
	factory.session = function(callback){
		$http.get('session').then(function(res){
			if(!res.data.errors){
				factory.current_user = res.data;
				callback(res);
			}else {
				factory.current_user = {};
				callback(false);
			}
		})
	}
	//creates new user
	factory.create = function(newUser, callback){
		$http.post("/users",newUser).then(function(res){
			if(!res.data.errors){
				factory.current_user = res.data;
			}
			callback(res);
		})
	}
	//login user
	factory.login = function(loginUser, callback){
		$http.post("/session", loginUser).then(function(res){
			if(!res.data.errors){
				factory.current_user = res.data;
			}
			callback(res);
		})
	}
	//queries all users	
	factory.index = function(callback){
		$http.get('/users').then(function(res){
			if(!res.data.errors){
				callback(res);
			}else{
				callback(false);
			}	
		})
	}
	//creates post
	factory.createPost = function(newPost, callback){
		$http.post("/posts",newPost).then(function(res){
			if(!res.data.errors){
				callback(false);
			}
			callback(res);
		})
	}
	//individual posts index
	factory.myIndex = function(id,callback){
		$http.get('/myPosts/'+id).then(function(res){
			if(!res.data.errors){
				callback(false);
			}
			callback(res);
		})
	}
	// creates comment
	factory.createComment = function(post,callback){
		$http.post('/comment',post).then(function(res){
			if(!res.data.errors){
				callback(false);
			}
			callback(res);			
		})
	}
	//index of posts
	factory.indexPost = function(callback){
		$http.get('/posts').then(function(res){
			callback(res);
		})
	}
	//like incriment
	factory.like = function(id,callback){
		$http.put('/like/'+id).then(function(res){
			callback(res);
		})
	}	
	//single post
	factory.show = function(id, callback){
		$http.get('/post/'+id).then(callback)
	}
	//delete post
	factory.delete = function(id,callback){
		$http.get('/destroy/'+id).then(function(res){
			callback(res);
		})
	}
	return factory;
})