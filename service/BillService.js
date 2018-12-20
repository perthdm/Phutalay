const reservationDao = require('../database/ReservationDao');
const roomDao = require('../database/RoomDao');
const CustomerDao = require('../database/CustomerDao');
module.exports = {
    getBill:async (req, res) => {
        let reservation = await reservationDao.getReservationById(req.params.id);
        let customer = await CustomerDao.getCustomerById(reservation.customer);
        let room = await roomDao.getByTypeNoParam();
        res.render('Bill', {
            reservation: reservation,
            customer: customer,
            room: room
        });
    }
}
