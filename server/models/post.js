var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	post: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	authorId: {
		type: String,
		required: true
	},
	img: { 
		type: String,
		required: false
	},
	comments: [{
		comment: {
			type: String,
		},
		author: {
			type: String,
		},
		email: {
			type: String,
		}
	}],
	likes: {
		type: Number,
		default: 0
	},
	email: {
		type: String,
	}
}, {timestamps: true})


mongoose.model('Post',PostSchema);
