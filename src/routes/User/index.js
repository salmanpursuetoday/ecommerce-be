const express = require('express');
const router = express.Router();
const { createCustomer,
  getCustomers,
  creteAdmin,
  signin,
  deleteUser,
  updateUser,
  createVendor,
  getVendors } = require('../../controllers/User');
const { authenticateUser,
  isAdmin } = require('../../middlewares');

router.post('/create-customer', createCustomer);
router.post('/update', authenticateUser, updateUser);
router.get('/get/customer', authenticateUser, isAdmin, getCustomers);
router.get('/create-admin', creteAdmin);
router.get('/delete/:_id', authenticateUser, isAdmin, deleteUser);
router.post('/create-vendor', authenticateUser, isAdmin, createVendor);
router.get('/get/vendors', authenticateUser, isAdmin, getVendors);
router.post('/signin', signin);

module.exports = router;