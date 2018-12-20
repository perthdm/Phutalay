const express = require('express');
const router = express.Router();
const checkinService = require('../service/CheckInService');

router.route('/update/checkIn').post(checkinService.checkIn);
router.route('/get/roombytype').post(checkinService.getRoomByType);
router.route('/checkIn/:id').get(checkinService.displayCheckIn);

module.exports = router;