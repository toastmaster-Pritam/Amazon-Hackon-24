const contract = require("../utils/web3setup");
const decodeRevertReason = require("../utils/errorDecoder");

const getUserDetails = async (req, res) => {
  try {
    const { address } = req.params;

    const userDetails = await contract.getUserDetails(address);
    const user = userDetails.map((owner) => owner.toString());
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    if (e.code === "CALL_EXCEPTION") {
      const reason = await decodeRevertReason(e.info.error.data);
      res.status(404).json({ success: "false", error: reason });
    }

    console.log(e);
  }
};

const isAdmin = async (req, res) => {
  try {
    const { address } = req.params;
    const admin = await contract.isAdmin(address);
    return res.status(200).json({
      success: true,
      admin: admin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: "false", error: error.message });
  }
};

module.exports = { getUserDetails, isAdmin };
