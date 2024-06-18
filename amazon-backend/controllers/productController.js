const contract = require('../utils/web3setup');


const getProductDetails = async (req, res) => {
    try {
        const { uniqueHash } = req.body;
        const product = await contract.getProductDetails(uniqueHash);
        return res.status(200).json({
            success: true,
            product: product,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: 'false', error: error.message });
    }
}

const getOwnerHistory = async (req, res) => {
    try {
        const { uniqueHash } = req.body;
        const history = await contract.getProductOwners(uniqueHash);
        return res.status(200).json({
            success: true,
            history: history,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: 'false', error: error.message });
    }
}

const verifyProduct = async (req, res) => {
    try {
        const { uniqueHash } = req.body;
        const verified = await contract.verifyProduct(uniqueHash);
        return res.status(200).json({
            success: true,
            verified: verified,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: 'false', error: error.message });
    }
}

module.exports = { getProductDetails, getOwnerHistory, verifyProduct}