const contract = require('../utils/web3setup');
const decodeRevertReason = require('../utils/errorDecoder');

const whiteListBrand = async (req, res) => {
    try {

        const {brandId}=req.body;
        const tx = await contract.whitelistBrand(brandId);
        await tx.wait();

        return res.status(200).json({
            success: true,
            message: 'Brand whitelisted successfully',
        });
        

    }  catch (e) {
        if (e.code === 'CALL_EXCEPTION') {
            const reason = await decodeRevertReason(e.info.error.data);
            res.status(500).json({ success: 'false', error: reason });
        }

        console.log(e.info);


    }
}

const removeBrandFromWhiteList = async (req, res) => {
    try {

        const {brandId}=req.body;
        const tx = await contract.removeWhitelistedBrand(brandId);
        await tx.wait();

        return res.status(200).json({
            success: true,
            message: 'Brand removed from whitelist successfully',
        });
        

    }  catch (e) {
        if (e.code === 'CALL_EXCEPTION') {
            const reason = await decodeRevertReason(e.info.error.data);
            res.status(500).json({ success: 'false', error: reason });
        }

        console.log(e.info);


    }
}

const getIPFSHash =async (req,res)=>{
    try {
        const {brandName}=req.body;
        const hash=await contract.getIPFSHash(brandName);
        return res.status(200).json({
            success: true,
            url: hash,
        });
    }  catch (e) {
        if (e.code === 'CALL_EXCEPTION') {
            const reason = await decodeRevertReason(e.info.error.data);
            res.status(500).json({ success: 'false', error: reason });
        }

        console.log(e.info);


    }
}


module.exports={ whiteListBrand, removeBrandFromWhiteList, getIPFSHash}
