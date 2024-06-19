const contract = require('../utils/web3setup');
const cloudinary = require('../utils/cloudinary');

const isBrandStored= async (req,res)=>{
    try {
        const {brandName}=req.body;
        const stored=await contract.isBrandStored(brandName);
        return res.status(200).json({
            success: true,
            stored: stored,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: 'false', error: error.message });
    }
}

const uploadBrandLogo= (req,res)=>{
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: 'false', error: err.message });
        }
        return res.status(200).json({
            success: true,
            url: result.secure_url,
        });
    });
}

module.exports={isBrandStored,uploadBrandLogo}