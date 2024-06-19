const express=require('express');

const router = express.Router();

const {whiteListBrand, removeBrandFromWhiteList, getIPFSHash}=require('../controllers/adminController')



router.post('/whitelistListBrand',whiteListBrand);
router.post('/removeBrandFromWhiteList',removeBrandFromWhiteList);
router.get('/getIPFSHash',getIPFSHash);

module.exports=router;