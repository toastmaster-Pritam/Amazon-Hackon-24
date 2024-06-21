import { getContract } from "@/utils/web3setup";
import { parseRevertReason } from "@/utils/errorDecoder";
import toast from "react-hot-toast";
const {ethereum}=window;

export const whitelistBrand = async (brandId) => {
    try {
        if (!ethereum){
            toast.error("Make sure you have metamask installed");
            return;
    
          } 
        const { contract,provider } = getContract();
        try {
            await contract.callStatic.whitelistBrand(
                brandId
            );
        } catch (staticCallError) {
            //console.log(staticCallError.error.data.data);
            const revertReason = parseRevertReason(staticCallError.error.data.data);
            console.error(`Revert reason: ${revertReason}`);
            toast.error(revertReason);

            return;
        }
        const tx = await contract.whitelistBrand(brandId);
        await tx.wait();

        toast.success("Brand whitelisted successfully!");
        const receipt = await provider.getTransactionReceipt(tx.hash);

        const whitelistBrandEvent = contract.interface.parseLog(
            receipt.logs[0]
        );
        console.log(whitelistBrandEvent)
    } catch (error) {
        console.log(error);
    }
};