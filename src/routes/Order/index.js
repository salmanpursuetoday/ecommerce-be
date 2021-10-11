const express = require('express');
const router = express.Router();

const { createOrder, getOrders } = require('../../controllers/Order');
const { authenticateUser, isCustomer, isAdmin } = require('../../middlewares');

router.post('/create', authenticateUser, isCustomer, createOrder);
router.get('/get',  getOrders);

module.exports = router;