const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
	name : {
        type : String,
        required : true,
        unique: true
	},
	roomType : {
		type:  String,
        required: true
	},
	price : {
        type : Number,
        required : true
    },
    status: {
        type : String,
        required : true 
    },
    detail : {
        type : String,
        required : true
    }
});


const Room = mongoose.model('room',RoomSchema,);

module.exports = Room;

