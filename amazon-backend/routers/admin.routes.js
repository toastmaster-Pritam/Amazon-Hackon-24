const express = require("express");

const router = express.Router();

const {
  getIPFSHash,
  ownerShipTransferEmail,
} = require("../controllers/adminController");

router.get("/getIPFSHash/:brandName", getIPFSHash);
router.post("/ownerShipTransferEmail", ownerShipTransferEmail);

module.exports = router;
