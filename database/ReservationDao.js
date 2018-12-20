const reservationModel = require('../models/reservation');
const mongoose = require('mongoose');


module.exports = {

  getAndCountByType: async function (options) {
    options.push({ "$sort": { "roomType": 1 } });
    options.push({
      "$group": {
        "_id": "$roomType",
        "count": { "$sum": 1 }
      }
    });
    options.push({ "$sort": { "roomType": 1 } });
    return await reservationModel.aggregate(options).exec();
  },

  updateReservation:async function (reservation) {
    reservation.save((err) => {
      if (err) {
        return false;
      }
      return true;
    })
  },
  insert: async function (reservation) {
    const reservationNew = new reservationModel(reservation)
    reservationNew.save((err) => {
      if (err) {
        return false;
      }
      return true;
    })
  },
  getReservationById:async function (id){
    return await reservationModel.findById(id);
  },
  getAll:async function (){
    return await reservationModel.find({});
  },
  getAllWithCustomer:async function() {
    return await reservationModel.aggregate([
      {
          "$lookup" : {
              "from": "customers",
              "localField": "customer",
              "foreignField": "_id",
              "as": "customer_data"
          }
      }
  ]).exec();
  }




};

