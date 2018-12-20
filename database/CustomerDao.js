const customerModel = require('../models/customer');
const mongoose = require('mongoose');

module.exports = {
    getCustomer: async (name) => {
        return await customerModel.findOne({ name });
    },
    getAll: async () => {
        return await customerModel.find({});
    },
    getCustomerById: async (id) => {
        return await customerModel.findById(id);
    },
    insert: async function (customer) {
        return await customer.save();
    },
};