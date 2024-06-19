const { ethers } = require('ethers');
async function decodeRevertReason(data) {
    try {
       
        if (data.startsWith('Reverted ')) {
            
               const hexData = data.slice(9); // "Reverted ".length is 9
                const abiCoder = new ethers.AbiCoder();
                const reason = abiCoder.decode(['string'], '0x' + hexData.slice(10))[0];
                return reason;
           
        } else {
            return 'Data does not start with "Reverted "';
        }
    } catch (error) {
        console.error('Error decoding revert reason:', error);
        return 'Error decoding revert reason';
    }
}

module.exports = decodeRevertReason