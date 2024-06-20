import { getContract } from "@/utils/web3setup";
import { parseRevertReason } from "@/utils/errorDecoder";
const {ethereum}=window;

export const removeWhitelistedBrand = async (brandId) => {
    try {
        if (!ethereum) return alert("Make sure you have metamask installed");
        const { contract,provider } = getContract();
        try {
            await contract.callStatic.removeWhitelistedBrand(
                brandId
            );
        } catch (staticCallError) {
            //console.log(staticCallError.error.data.data);
            const revertReason = parseRevertReason(staticCallError.error.data.data);
            console.error(`Revert reason: ${revertReason}`);
            alert(revertReason);

            return;
        }
        const tx = await contract.removeWhitelistedBrand(brandId);
        await tx.wait();

        console.log("Brand removed from Whitelisted!");
        const receipt = await provider.getTransactionReceipt(tx.hash);

        const removeWhitelistedBrandEvent = contract.interface.parseLog(
            receipt.logs[0]
        );
        console.log(removeWhitelistedBrandEvent)
    } catch (error) {
        console.log(error);
    }
};