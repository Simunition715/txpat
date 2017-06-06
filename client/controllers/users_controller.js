app.controller('UsersController', function(UserFactory, $location, $routeParams){
	console.log('instanciating users controller...');
	var self = this;
	self.newUser = {};
	self.registrationErrors = [];
	self.loginErrors = [];
	self.postErrors = [];
	self.current_user = {};
	self.loginUser = {};
	self.userIndex = [];
	self.posts = [];
	self.single = {};
	self.singleId = {};
	self.admin1 = 'wbprogramming@icloud.com';
	self.commentErrors = "";
	self.myPosts = [];
	self.email = UserFactory.current_user.email

	//checks to see if user is in session
	UserFactory.session(function(res){
		if(res){
			self.current_user = res.data;
		}else {
			self.current_user = {};
			self.loginUser = {};
			$location.url('/');
		}
	})

	//logout & return to /
	self.logout = function(){
		self.current_user = {};
		$location.url('/')
	}

	//create user --register and redirect to dashboard
	self.create = function(newUser){
		console.log(newUser);
		UserFactory.create(newUser, function(res){
			if(res.data.errors){
				console.log(res.data);
				for(key in res.data.errors){
					var error = res.data.errors[key]
					self.registrationErrors.push(error.message);	
				}
			}else {
				window.location.reload();
				alert("Please proceed to login and Welcome to TXPATS!");
			}
		})
	}

	//login user redirect to dashboard
	self.login = function(loginUser){
		UserFactory.login(loginUser, function(res){
		self.loginErrors = [];
			if(res.data.errors){
				self.loginUser = {email:"", password:""};
				self.loginErrors.push(res.data.errors);
			}else{
				self.current_user = res.data;
				$location.url('/dashboard')

			}
		})
	}

	//shows all members
	self.index = function(){
		UserFactory.index(function(res){
			if(res.data.errors){
				console.log(errors);
			}else{
				self.userIndex = res.data;
			}
		})
	}

	//create post
	self.createPost = function(newPost){
		console.log(newPost);
		newPost.authorId = UserFactory.current_user._id,
		newPost.author =  UserFactory.current_user.first_name+" "+UserFactory.current_user.last_name,
		newPost.email = UserFactory.current_user.email
		UserFactory.createPost(newPost, function(res){
			if(res){
				window.location.reload();
			}else{
				console.log("failed post");
			}
		})
	}

	//index of posts
	self.indexPost = function(){
		UserFactory.indexPost(function(res){
			if(!res.data.errors){
				self.posts = res.data
			}else{
				$location.url('/dashboard');	
			}
		})
	}


	//creates comment
	self.createComment = function(newComment){
		post = {
			post: self.singleId._id,
			comment: newComment,
			author: UserFactory.current_user.first_name+" "+UserFactory.current_user.last_name,
			email: UserFactory.current_user.email
		}
		if(post.comment == undefined){
			self.commentErrors = "Comment cannot be left blank!";
		}
		else{
			UserFactory.createComment(post,function(res){
				if(res){
					self.commentErrors = res.data.errors;
				}else{
					window.location.reload();
				}
			})
		}
	}

	//like post incrimenter
	self.like = function(id){
		UserFactory.like(id,function(res){
			window.location.reload();
		})
	}

	//single post
	self.show = function(){
		UserFactory.show($routeParams.id, function(res){
			self.single = res.data;
			self.singleId = res.data;
		})
	}

	// individual index of posts
	self.myIndex = function(){
		console.log($routeParams.id);
		UserFactory.myIndex($routeParams.id,function(res){
			self.myPosts = res.data;
		})
	}


	//delete post
	self.delete2 = function(id){
		UserFactory.delete(id, function(res){
			$location.url('/dashboard');
		})
	}	
	//delete post
	self.delete = function(id){
		UserFactory.delete(id, function(res){
			window.location.reload();
		})
	}		


})