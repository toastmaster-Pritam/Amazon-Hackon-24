import { getContract } from "@/utils/web3setup";
import { parseRevertReason } from "@/utils/errorDecoder";
const {ethereum}=window;

export const whitelistBrand = async (brandId) => {
    try {
        if (!ethereum) return alert("Make sure you have metamask installed");
        const { contract,provider } = getContract();
        try {
            await contract.callStatic.whitelistBrand(
                brandId
            );
        } catch (staticCallError) {
            //console.log(staticCallError.error.data.data);
            const revertReason = parseRevertReason(staticCallError.error.data.data);
            console.error(`Revert reason: ${revertReason}`);
            alert(revertReason);

            return;
        }
        const tx = await contract.whitelistBrand(brandId);
        await tx.wait();

        console.log("Brand Whitelisted!");
        const receipt = await provider.getTransactionReceipt(tx.hash);

        const whitelistBrandEvent = contract.interface.parseLog(
            receipt.logs[0]
        );
        console.log(whitelistBrandEvent)
    } catch (error) {
        console.log(error);
    }
};