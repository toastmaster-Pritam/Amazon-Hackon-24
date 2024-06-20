const express=require('express');

const router = express.Router();

const {getUserDetails,isAdmin}=require('../controllers/userController')

router.get('/details/:address',getUserDetails);
router.get('/isAdmin/:address',isAdmin);

module.exports=router;