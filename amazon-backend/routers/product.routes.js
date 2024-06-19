const express=require('express');

const router = express.Router();

const {getProductDetails, getOwnerHistory, verifyProduct}=require('../controllers/productController')

router.get('/getProductDetails',getProductDetails);
router.get('/getOwnerHistory',getOwnerHistory);
router.get('/verifyProduct',verifyProduct);

module.exports=router;