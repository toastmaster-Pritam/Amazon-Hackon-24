const contract = require('../utils/web3setup');

const whiteListBrand = async (req, res) => {
    try {

        const {brandId}=req.body;
        const tx = await contract.whiteListBrand(brandId);
        await tx.wait();

        return res.status(200).json({
            success: true,
            message: 'Brand whitelisted successfully',
        });
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: 'false', error: error.message });

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
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: 'false', error: error.message });

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
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: 'false', error: error.message });
    }
}


module.exports={ whiteListBrand, removeBrandFromWhiteList, getIPFSHash}
