const contract = require('../utils/web3setup');
const decodeRevertReason = require('../utils/errorDecoder');

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


module.exports={getIPFSHash}
