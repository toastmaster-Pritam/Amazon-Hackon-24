const express = require('express');
const upload = require('../utils/multer');

const router = express.Router();

const { isBrandStored, uploadBrandLogo, getAllManufacturerBrands } = require('../controllers/brandController')

router.get('/isBrandStored', isBrandStored);
router.post('/uploadBrandLogo', upload.single('brandLogo'), uploadBrandLogo);
router.get('/all/:address', getAllManufacturerBrands);

module.exports = router;