import { getContract } from "@/utils/web3setup";
import { parseRevertReason } from "@/utils/errorDecoder";
import toast from "react-hot-toast";
const { ethereum } = window;

export const registerUser = async (role, name, email, phoneNumber) => {
    try {
        if (!ethereum){
            toast.error("Make sure you have metamask installed");
            return;
    
          } 
        const { contract, provider } = getContract();
        try {
            await contract.callStatic.registerUser(
                role,
                name,
                email,
                phoneNumber
            );
        } catch (staticCallError) {
            //console.log(staticCallError.error.data.data);
            const revertReason = parseRevertReason(staticCallError.error.data.data);
            console.error(`Revert reason: ${revertReason}`);
            toast.error(revertReason);

            return;
        }
        const tx = await contract.registerUser(role, name, email, phoneNumber);
        await tx.wait();

        console.log("User registered successfully!");
        toast.success("User registered successfully!");
        const receipt = await provider.getTransactionReceipt(tx.hash);

        const userRegisteredEvent = contract.interface.parseLog(
            receipt.logs[0]
        );
        console.log(userRegisteredEvent)
    } catch (error) {
        console.log(error);
    }
};