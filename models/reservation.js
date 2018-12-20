const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

const ReservationSchema = new Schema({
    customer : Schema.ObjectId,
    room : [Schema.ObjectId],
    total: {
        type: Number,
        require: true
    },
    roomType : [String],
    roomTypeAmount:{},
    dateBookingStart : Date,
    dateBookingEnd : Date,
    bookingAt : Date,
    dateCheckIn : {
        type : Date
    },
    dateCheckOut : {
        type : Date
    },
    status : Number
});


const Reservation = mongoose.model('reservation',ReservationSchema);

module.exports = Reservation;