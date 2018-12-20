const express = require('express');
const router = express.Router();
const checkoutService = require('../service/CheckOutService');

router.route('/update/checkOut').post(checkoutService.checkOut);
router.route('/checkOut/:id').get(checkoutService.displayCheckOut);

module.exports = router;