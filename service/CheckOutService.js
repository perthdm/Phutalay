//checkOut(id) => updateStatus(arrayList<Room>)
//             => update(Reservation)
//              => getById(id)

//getReservation(id) = getById(id) //แสดงหน้าบิล

const reservationDao = require('../database/ReservationDao');
const roomDao = require('../database/RoomDao');
const CustomerDao = require('../database/CustomerDao');
const CustomerModel = require('../models/customer');
const Alert = require('../service/AlertService');


module.exports = {

    checkOut: async (req, res) => {
        let reservation = await reservationDao.getReservationById(req.body.id);
        if (reservation) {
            reservation.checkOut = new Date();
            reservation.status = 2;
            await reservationDao.updateReservation(reservation);
            await roomDao.updateStatus("ว่าง", reservation.room);
            Alert.displayAlert(res,"Success","เช็คเอาท์สำเร็จ","seccess","/reservation")
        } else {
            Alert.displayAlert(res,"Error","Something went wrong!","error","/reservation")
        }
    },
    displayCheckOut: async (req, res) => {
        let reservation = await reservationDao.getReservationById(req.params.id);
        let customer = await CustomerDao.getCustomerById(reservation.customer);
        res.render('CheckOut', {
            reservation: reservation,
            customer: customer,
            rooms: await roomDao.getRoomCheckIn(reservation.room)
        });
    }
}



