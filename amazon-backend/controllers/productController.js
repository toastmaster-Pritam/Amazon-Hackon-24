const contract = require('../utils/web3setup')
const decodeRevertReason = require('../utils/errorDecoder');

const getProductDetails = async (req, res) => {
    try {
        const { uniqueHash } = req.body;
        const product = await contract.getProductDetails(uniqueHash);
        return res.status(200).json({
            success: true,
            product: product,
        });
    }  catch (e) {
        if (e.code === 'CALL_EXCEPTION') {
            const reason = await decodeRevertReason(e.info.error.data);
            res.status(500).json({ success: 'false', error: reason });
        }

        console.log(e.info);


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
    }
    catch (e) {
        if (e.code === 'CALL_EXCEPTION') {
            const reason = await decodeRevertReason(e.info.error.data);
            res.status(500).json({ success: 'false', error: reason });
        }

        console.log(e.info);


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
    } catch (e) {
        if (e.code === 'CALL_EXCEPTION') {
            const reason = await decodeRevertReason(e.info.error.data);
            res.status(500).json({ success: 'false', error: reason });
        }

        console.log(e.info);


    }
}

module.exports = { getProductDetails, getOwnerHistory, verifyProduct }