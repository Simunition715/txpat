var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');

module.exports = {
	//query to find all users
	index: function(req,res){
		User.find({}).exec(function(err,doc){
			if(err){
				return res.json(err);
			}
			return res.json(doc);
		})
	},
	//session
	session: function(req, res){
		if(!req.session.user){
			return res.json({
				"errors": "not authorized"
			})
		}
		return res.json(req.session.user);
	},
	//creates user
	create: function(req,res){
		if (req.body.password != req.body.passwordconfirmation){
			return res.json({
				"errors":{
					"password":{
						"message":"Passwords do not match"
					}
				}
			})
		}
		var user = new User(req.body);
		user.save(function(err, user){
			if(err){
				return res.json(err);
			}
			req.session.user = user;
			return res.json(user);
		})		
	},
	login: function(req,res){
		var isValid = true;
		User.findOne({email:req.body.email}).exec(function(err,doc){
			if(err){
				return res.json(err);
			}
			if(!doc){
				isValid = false;
			} else {
				if(bcrypt.compareSync(req.body.password,doc.password)){
					var user = {
						first_name:doc.firstname,
						last_name:doc.lastname,
						posts:doc.posts,
						comments:doc.comments,
						email:doc.email,
						_id:doc.id
					}
					req.session.user = user
					return res.json(user);
				} else {
					isValid = false;
				}
			}
			if(!isValid){
				return res.json({
					"errors": "invalid credentials"
				})
			}
		})
	}	

}	
