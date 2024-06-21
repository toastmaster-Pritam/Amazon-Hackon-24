const express=require('express');

const router = express.Router();

const {getProductDetails, getProductOwners, verifyProduct,getAllManufacturerProducts}=require('../controllers/productController')

router.get('/getProductDetails/:hash',getProductDetails);
router.get('/getOwnerHistory/:hash',getProductOwners);
router.get('/verifyProduct/:hash',verifyProduct);
router.get('/all/:address',getAllManufacturerProducts);

module.exports=router;