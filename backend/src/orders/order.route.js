const express = require('express');
const { createOrder, getOrderByEmail } = require('./order.controller');

const router =  express.Router();

// create order endpoint
router.post("/", createOrder);

// GET /api/orders/:email
router.get('/:email', getOrderByEmail);
module.exports = router;