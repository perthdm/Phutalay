const reservationDao = require('../database/ReservationDao');
const roomDao = require('../database/RoomDao');
const CustomerDao = require('../database/CustomerDao');
const CustomerModel = require('../models/customer');
const ObjectId = require('mongoose').Types.ObjectId;
const Alert = require('../service/AlertService');
module.exports = {
    displayCheckIn: async (req, res) => {
        let reservation = await reservationDao.getReservationById(req.params.id);
        let customer = await CustomerDao.getCustomerById(reservation.customer);

        res.render('CheckIn', {
            reservation: reservation,
            customer: customer
        });
    },
    checkIn: async (req, res) => {
        let { roomDetail, room } = roomDetailAdd(req);
        let reservation = await reservationDao.getReservationById(req.body.id);
        if (reservation) {
            reservation.checkIn = new Date();
            reservation.room = room;
            reservation.remaining = 0;
            reservation.status = 1;
            await reservation.save();
            await roomDao.updateStatus("ไม่ว่าง", room);
            Alert.displayAlert(res,"Success","เช็คอินสำเร็จ","seccess","/reservation");
        } else {
            Alert.displayAlert(res,"Error","Something went wrong!","error","/reservation");
           
        }
    },
    getRoomByType: async (req, res) => {
        const rooms = await roomDao.getByType(req.body.type);
        for (let i = 0; i < rooms.length; i++) {
            rooms[i].room = await roomDao.getType(rooms[i]._id);
        }
        res.json({
            data: rooms
        })
    }
}

function roomDetailAdd(req) {
    let roomDetail = [];
    let room = [];
    console.log(req.body["room_" + req.body.roomtypes]);
    if (req.body.roomtypes instanceof Array) {
        req.body.roomtypes.forEach((items) => {
            if (req.body["room_" + items] instanceof Array) {
                req.body["room_" + items].forEach((data) => {
                   

                    room.push(new ObjectId(data));
                });
            } else {
                
                room.push(new ObjectId(req.body["room_" + items]));
            }
        });
    } else {
        if(req.body["room_" + req.body.roomtypes] instanceof Array ){
            req.body["room_" + req.body.roomtypes].forEach((data) => {
                

                room.push(new ObjectId(data));
            });
        }else{
            room.push(new ObjectId(req.body["room_" + req.body.roomtypes]));
        }
        
        
       
    }
    return { roomDetail: roomDetail, room: room };
}

