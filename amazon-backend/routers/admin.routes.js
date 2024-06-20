const express=require('express');

const router = express.Router();

const {getIPFSHash}=require('../controllers/adminController')

router.get('/getIPFSHash',getIPFSHash);

module.exports=router;