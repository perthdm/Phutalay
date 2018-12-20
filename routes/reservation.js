const express = require('express');
const router = express.Router();
const ReservationService = require('../service/ReservationService');

router.route('/').get(ReservationService.getReservationList);

module.exports = router;


