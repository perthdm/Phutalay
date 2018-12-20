const reservationDao = require('../database/ReservationDao');
const roomDao = require('../database/RoomDao');
const CustomerDao = require('../database/CustomerDao');
const CustomerModel = require('../models/customer');
const Alert = require('../service/AlertService');
module.exports = {
    index: (req, res) => {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1)
        res.render('Booking', {
            today: new Date(),
            tomorrow: tomorrow
        });
    },
    booking: async (req, res) => {
        // res.json(req.body);
        let { total, roomTypeBook, roomTypeamount } = roomSum(req);
        let reservation = {
            customer: await checkCustomerOption(req.body),
            total: total,
            roomType: roomTypeBook,
            roomTypeAmount: roomTypeamount,
            dateBookingStart: new Date(req.body.reV_dateS),
            dateBookingEnd: new Date(req.body.reV_dateE),
            bookingAt: new Date(),
            status: 0
        };
        if (reservationDao.insert(reservation)) {
            Alert.displayAlert(res,"Success","จองห้องพักสำเร็จ","success","/reservation");
        } else {
            Alert.displayAlert(res,"Error","Something went wrong!","error","/booking");
        }
    },
    getRoomAvailability: async (req, res) => {
        let dateS = new Date(parseInt(req.body.start));
        let dateE = new Date(parseInt(req.body.end));
        let roomType = await getRoomTypeByDate(dateS, dateE);
        let rooms = await roomDao.getByTypeNoParam();
        for (let i = 0; i < rooms.length; i++) {
            rooms[i].use = 0;
            for (let j = 0; j < roomType.length; j++) {
                if (roomType[j]._id == rooms[i]._id) {
                    rooms[i].use = roomType[j].count;
                    break;
                }
            }
        }
        res.json(rooms);
    },
    getCustomerAll: async (req, res) => {

        var cusArr = await CustomerDao.getAll();
        res.json(cusArr);
    }
}

async function checkCustomerOption(req) {
    if (req.cusType != "old") {
        let customer = new CustomerModel({
            firstname: req.cus_firstname,
            lastname: req.cus_lastname,
            idCard: req.cus_idcard,
            email: req.cus_email,
            phone: req.cus_phone,
            address: req.cus_address,
            tumbon: req.cus_tumbon,
            district: req.cus_district,
            province: req.cus_province,
            post: req.cus_post
        });
        let customerNew = await CustomerDao.insert(customer);
        return customerNew._id;
    } else {
        return req.cusID;
    }
}

function roomSum(req) {
    let total = 0;
    let roomTypeBook = [];
    let roomTypeamount = {};
    for (let index = 0; index < req.body.reV_roomType_name.length; index++) {
        if (parseInt(req.body["reV_roomType_amount_" + req.body.reV_roomType_name[index]]) > 0) {
            for(let i=1;i<=parseInt(req.body["reV_roomType_amount_" + req.body.reV_roomType_name[index]]);i++){
                roomTypeBook.push(req.body.reV_roomType_name[index]);
            }
            total += parseInt(req.body["reV_roomType_amount_" + req.body.reV_roomType_name[index]]) * parseInt(req.body["reV_roomType_price_" + req.body.reV_roomType_name[index]]);
            roomTypeamount[req.body.reV_roomType_name[index]] = parseInt(req.body["reV_roomType_amount_" + req.body.reV_roomType_name[index]]);
        }
    }
    return {
        total: total,
        roomTypeBook: roomTypeBook,
        roomTypeamount: roomTypeamount
    };
}

async function getRoomTypeByDate(dateCheckIn, dateCheckOut) {
    return reservationDao.getAndCountByType([
        { "$unwind": "$roomType" },
        {
            "$match": {
                "$or": [
                    { "dateBookingStart": { "$gte": dateCheckIn, "$lte": dateCheckOut } },
                    {
                        "$and": [
                            { "dateBookingStart": { "$lte": dateCheckIn } },
                            { "dateBookingEnd": { "$gte": dateCheckOut } }
                        ]
                    },
                    {
                        "$and": [
                            { "dateBookingStart": { "$gte": dateCheckIn } },
                            { "dateBookingEnd": { "$lte": dateCheckOut } }
                        ]
                    },
                    { "dateBookingEnd": { "$gte": dateCheckIn, "$lte": dateCheckOut } }
                ]
            }
        },
        {
            "$match": {
                "status":{  "$lt": 2 }
            }
        }
    ]);
}