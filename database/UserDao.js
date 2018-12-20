const userModel = require('../models/User');
const mongoose = require('mongoose');


module.exports = {
  getUser: async function (username) {
    return await userModel.findOne({ username });
  },

  getAll: async () => {
    return await userModel.find({});
  },

  insert: async function (user) {
    user.save((err) => {
      if (err) {
        console.log(err);
      }
    });
  },
};

