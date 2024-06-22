const contract = require("../utils/web3setup");
const cloudinary = require("../utils/cloudinary");
const decodeRevertReason = require("../utils/errorDecoder");

const isBrandStored = async (req, res) => {
  try {
    const { brandName } = req.params;
    const stored = await contract.isBrandStored(brandName);
    return res.status(200).json({
      success: true,
      stored: stored,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: "false", error: error.message });
  }
};

const getAllManufacturerBrands = async (req, res) => {
  try {
    const { address } = req.params;
    const brands = await contract.getAllManufacturerBrands(address);
    return res.status(200).json({
      success: true,
      brands,
    });
  } catch (e) {
    if (e.code === "CALL_EXCEPTION") {
      const reason = await decodeRevertReason(e.info.error.data);
      res.status(404).json({ success: "false", error: reason });
    }
    console.log("hi", e.info);
  }
};

const getAllBrands = async (req, res) => {
  try {
    const brands = await contract.getAllBrands();
    return res.status(200).json({
      success: true,
      brands,
    });
  } catch (e) {
    if (e.code === "CALL_EXCEPTION") {
      const reason = await decodeRevertReason(e.info.error.data);
      res.status(404).json({ success: "false", error: reason });
    }

    console.log(e.info);
  }
};

const uploadBrandLogo = (req, res) => {
  console.log(req.file);
  cloudinary.uploader.upload(req.file.path, async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: "false", error: err.message });
    }
    return res.status(200).json({
      success: true,
      url: result.secure_url,
    });
  });
};

module.exports = {
  isBrandStored,
  uploadBrandLogo,
  getAllManufacturerBrands,
  getAllBrands,
};
