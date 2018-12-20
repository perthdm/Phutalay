const express = require('express');
const router = express.Router();
const BookingService = require('../service/BookingService');

router.route('/').get(BookingService.index);
router.route('/').post(BookingService.booking);
router.route('/get/room/availability').post(BookingService.getRoomAvailability);
router.route('/get/customer/all').get(BookingService.getCustomerAll);


module.exports = router;