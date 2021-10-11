const express = require('express');
const router = express.Router();
const multer = require('multer');
const shortId = require('shortid');
const path = require('path');

const { createProduct, getProdutcs, getProductByVendor } = require('../../controllers/Products');
const { authenticateUser, isVendor } = require('../../middlewares');

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + '-' + file.originalname);
  }
})
const upload = multer({ storage });

router.post('/create', authenticateUser, isVendor, upload.array('productPictures'), createProduct);
router.get('/get', getProdutcs);
router.get('/get/:vendorId', authenticateUser, isVendor, getProductByVendor);
module.exports = router;