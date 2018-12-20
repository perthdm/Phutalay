const express = require('express');
const router = express.Router();
const BillService = require('../service/BillService');

router.route('/bill/:id').get(BillService.getBill);

module.exports = router;