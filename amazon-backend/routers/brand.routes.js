const express=require('express');
const upload=require('../utils/multer');

const router = express.Router();

const {isBrandStored,uploadBrandLogo}=require('../controllers/brandController')

router.get('/isBrandStored',isBrandStored);
router.post('/uploadBrandLogo',upload.single('brandLogo'),uploadBrandLogo);

module.exports=router;