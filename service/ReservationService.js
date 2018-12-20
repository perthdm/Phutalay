const reservationDao = require('../database/ReservationDao');
const roomDao = require('../database/RoomDao');


//reservationList()->getAll()
//removeReservation(id)->delete(id)

module.exports = {
    getReservationList: async (req, res) => {
        let reservations = await reservationDao.getAllWithCustomer();
        console.log(reservations);
        res.render('Reservation',
            {
                datas : reservations,
                firstname: req.session.firstname,
                lastname: req.session.lastname,
                username: req.session.username
            });
    },

    
}



async function getRoomTypeByDate(dateCheckIn, dateCheckOut) {
    return reservationDao.getAndCountByType([
        { "$unwind": "$roomType" },
        {
            "$match": {
                "$or": [
                    { "dateBooking.dateCheckStart": { "$gte": dateCheckIn, "$lte": dateCheckOut } },
                    {
                        "$and": [
                            { "dateBooking.dateCheckStart": { "$lte": dateCheckIn } },
                            { "dateBooking.dateCheckEnd": { "$gte": dateCheckOut } }
                        ]
                    },
                    {
                        "$and": [
                            { "dateBooking.dateCheckStart": { "$gte": dateCheckIn } },
                            { "dateBooking.dateCheckEnd": { "$lte": dateCheckOut } }
                        ]
                    },
                    { "dateBooking.dateCheckEnd": { "$gte": dateCheckIn, "$lte": dateCheckOut } }
                ]
            }
        }
    ]);
}