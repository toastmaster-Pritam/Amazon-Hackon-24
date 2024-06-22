const contract = require("../utils/web3setup");
const decodeRevertReason = require("../utils/errorDecoder");
const sendEmail = require("../utils/sendEmail");

const getIPFSHash = async (req, res) => {
  try {
    const { brandName } = req.params;
    const hash = await contract.getIPFSHash(brandName);
    return res.status(200).json({
      success: true,
      url: hash,
    });
  } catch (e) {
    if (e.code === "CALL_EXCEPTION") {
      const reason = await decodeRevertReason(e.info.error.data);
      res.status(500).json({ success: "false", error: reason });
    }

    console.log(e.info);
  }
};
const ownerShipTransferEmail = async (req, res) => {
  const {
    name,
    email,
    uniqueHash,
    requesterAddress,
    requesterName,
    productId,
    productName,
    brandId,
    productImage,
  } = req.body;

  const FRONT_END_URL = process.env.FRONTEND_URL; // Assuming you have this in your environment variables
  const subject = "Ownership Transfer Request";
  const message = `
      <p>Hello, ${name}</p>
      <p>You have received a request to transfer ownership of the product <strong>${productName}</strong> (ID: ${productId}) from your account to another user.</p>
      <img src="${productImage}" alt="Product Image" />
      <p><strong>Requester Name:</strong> ${requesterName}</p>
      <p><strong>Requester Address:</strong> ${requesterAddress}</p>
      <p><strong>Brand ID:</strong> ${brandId}</p>
      <p>To approve this ownership transfer, please click on the link below:</p>
      <p><a href="${FRONT_END_URL}/user/approveOwnership/${uniqueHash}">Approve Ownership Transfer</a></p>
      <p>If you did not initiate this request, please disregard this email.</p>
      <p>Thank you,</p>
      <p>Your Company Name</p>
    `;

  try {
    await sendEmail({
      email,
      subject,
      message,
    });
    return res.status(200).json({
      success: true,
      message: `Email sent successfully to ${email}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error!",
    });
  }
};

module.exports = { getIPFSHash, ownerShipTransferEmail };
