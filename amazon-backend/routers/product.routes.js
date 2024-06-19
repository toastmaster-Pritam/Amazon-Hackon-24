const express=require('express');

const router = express.Router();

const {getProductDetails, getOwnerHistory, verifyProduct,getAllManufacturerProducts}=require('../controllers/productController')

router.get('/getProductDetails',getProductDetails);
router.get('/getOwnerHistory',getOwnerHistory);
router.get('/verifyProduct',verifyProduct);
router.get('/all/:address',getAllManufacturerProducts);

module.exports=router;