const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
	firstname : {
		type: String,
		lowercase: true
    },
    lastname : {
		type: String,
		lowercase: true
    },
	idCard : {
		type: String,
		required: true,
		unique: true,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    phone : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    tumbon : {
        type : String,
        required : true
    },
    district : {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    post:{
        type: String,
        required: true
    }
});


const Customer = mongoose.model('customer',CustomerSchema);

module.exports = Customer;