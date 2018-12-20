const roomModel = require('../models/room');
const mongoose = require('mongoose');


module.exports = {

  get: async function (options) {
    return await roomModel.aggregate(options).exec();
  },
  getByType: async function (type) {
    return await roomModel.aggregate([
      {"$match":{"roomType":{"$in":type},"status":"ว่าง"}},
      { "$sort": { "roomType": 1 } },
      {"$group" : {
          "_id":"$roomType",
          "price" : { "$first": '$price' },
          "count":{"$sum":1}
          }
      },
      { "$sort": { "roomType": 1 } }
  ]).exec();

  },
  getRoomCheckIn: async function (ids) {
    console.log(ids);
    return await roomModel.aggregate([
      {"$match":{"_id":{"$in":ids}}}
  ]).exec();

  },
  getByTypeNoParam:async function () {
    return await roomModel.aggregate([
      { "$sort": { "roomType": 1 } },
      {"$group" : {
          "_id":"$roomType",
          "price" : { "$first": '$price' },
          "count":{"$sum":1}
          }
      },
      { "$sort": { "roomType": 1 } }
  ]).exec();

  }

  ,
  getType: async function (id) {
    return  await roomModel.find({ roomType: id });

  },
  updateStatus:async function (status,arr){
    arr.forEach(async (item)=>{
      let room = await roomModel.findById(item);
      room.status = status;
      await room.save();
    });
  },

  
 
  
};

