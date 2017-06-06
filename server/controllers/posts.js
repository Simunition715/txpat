var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');



module.exports = {
	//query to find all posts
	index: function(req,res){
		Post.find({}).exec(function(err,doc){
			if(err){
				return res.json(err);
			}
			return res.json(doc);
		})
	},

	//creates post
	create: function(req,res){
		console.log("has id?",req.body);
		var post = new Post(req.body);
		post.save(function(err, post){
			if(err){
				console.log(err);
				return res.json(err);
			}else{
				console.log(post);
				return res.json(post);
			}
		})		
	},

	//find single post
	single: function(req, res){
		Post.findById(req.params.id).exec(function(err, doc){
			if(err){
				return res.json(err);
			}
			return res.json(doc);
		})
	},

	//creates comment
	comment: function(req, res){
		Post.findById(req.body.post).exec(function(err,doc){
			if(err){
				return res.json(err);
			}
			comment = {
				comment: req.body.comment.comment,
				author: req.body.author,
			}
			doc.comments.push(comment)
			doc.save()
			return res.json(doc);
		})
	},

	//individual indexed posts
	myindex: function(req,res){
		console.log("this",req.params.id);
		Post.find({authorId:req.params.id}).exec(function(err,doc){
			if(err){
				return res.json(err);
			}
			return res.json(doc);
		})
	},

	//like incrementing
	like: function(req,res){
		Post.findById(req.params.id).exec(function(err,doc){
			if(err){
				return res.json(err);
			}
			doc.likes++
			doc.save();
			return res.json(doc);
		})
	},

	//delete single post
	destroy: function(req,res){
		console.log(req.params.id);
		Post.findByIdAndRemove(req.params.id).exec(function(err,doc){
			if(err){
				return res.json(err);
			}
			return res.json(doc);
		})
	}

}