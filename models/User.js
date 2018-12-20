const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

const UserSchema = new Schema({
	username : {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password : {
		type: String,
		required: true
	},
	firstname : {
		type: String,
		required: true
	},
	lastname : {
		type: String,
		required: true
	}
}, { 
	timestamps: { 
		createdAt: 'create_at' ,
		updatedAt: 'update_at'
	}
});

const User = mongoose.model('user',UserSchema);

module.exports = User;