const contract = require("../utils/web3setup");
const decodeRevertReason = require("../utils/errorDecoder");

const getProductDetails = async (req, res) => {
  try {
    const { hash } = req.params;
    const product = await contract.getProductDetails(hash);
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (e) {
    if (e.code === "CALL_EXCEPTION") {
      const reason = await decodeRevertReason(e.info.error.data);
      res.status(404).json({ success: "false", error: reason });
    }

    console.log(e.info);
  }
};

const getProductOwners = async (req, res) => {
  try {
    const { hash } = req.params;
    const history = await contract.getProductOwners(hash);
    const stringifiedHistory = history.map((owner) => owner.toString());
    return res.status(200).json({
      success: true,
      history: stringifiedHistory,
    });
  } catch (e) {
    if (e.code === "CALL_EXCEPTION") {
      const reason = await decodeRevertReason(e.info.error.data);
      res.status(404).json({ success: "false", error: reason });
    }

    console.log(e);
  }
};

const verifyProduct = async (req, res) => {
  try {
    const { hash } = req.params;
    const verified = await contract.verifyProduct(hash);
    return res.status(200).json({
      success: true,
      verified: verified,
    });
  } catch (e) {
    if (e.code === "CALL_EXCEPTION") {
      const reason = await decodeRevertReason(e.info.error.data);
      res.status(404).json({ success: "false", error: reason });
    }

    console.log(e.info);
  }
};

const getAllManufacturerProducts = async (req, res) => {
  try {
    const { address } = req.params;
    const products = await contract.getAllManufacturerProducts(address);
    return res.status(200).json({
      success: true,
      products: products,
    });
  } catch (e) {
    if (e.code === "CALL_EXCEPTION") {
      const reason = await decodeRevertReason(e.info.error.data);
      res.status(404).json({ success: "false", error: reason });
    }

    console.log(e.info);
  }
};

module.exports = {
  getProductDetails,
  getProductOwners,
  verifyProduct,
  getAllManufacturerProducts,
};
