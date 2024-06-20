import { getContract } from "@/utils/web3setup";
import { parseRevertReason } from "@/utils/errorDecoder";
const { ethereum } = window;

export const registerUser = async (role, name, email, phoneNumber) => {
    try {
        if (!ethereum) return alert("Make sure you have metamask installed");
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
            alert(revertReason);

            return;
        }
        const tx = await contract.registerUser(role, name, email, phoneNumber);
        await tx.wait();

        console.log("User registered successfully!");
        const receipt = await provider.getTransactionReceipt(tx.hash);

        const userRegisteredEvent = contract.interface.parseLog(
            receipt.logs[0]
        );
        console.log(userRegisteredEvent)
    } catch (error) {
        console.log(error);
    }
};