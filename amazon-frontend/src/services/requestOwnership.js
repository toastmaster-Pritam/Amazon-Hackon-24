import { getContract } from "@/utils/web3setup";
import { parseRevertReason } from "@/utils/errorDecoder";
const { ethereum } = window;
export const requestOwnership = async (_uniqueHash) => {
    try {
      if (!ethereum) return alert("Make sure you have metamask installed");
      const { contract, provider } = getContract();

      try {
        await contract.callStatic.requestOwnership(_uniqueHash);
      } catch (staticCallError) {
        //console.log(staticCallError.error.data.data);
        const revertReason = parseRevertReason(staticCallError.error.data.data);
        console.error(`Revert reason: ${revertReason}`);
        alert(revertReason);

        return;
      }

      const tx = await contract.requestOwnership(_uniqueHash);
      await tx.wait();

      const receipt = await provider.getTransactionReceipt(tx.hash);
      console.log(receipt)

      const requestOwnershipEvent = contract.interface.parseLog(
        receipt.logs[0]
      );

      console.log(requestOwnershipEvent);
    } catch (error) {
      console.error("Internal Server Error!",error);
    }
  };