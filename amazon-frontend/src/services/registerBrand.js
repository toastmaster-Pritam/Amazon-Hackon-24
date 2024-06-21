import { getContract } from "@/utils/web3setup";
import { parseRevertReason } from "@/utils/errorDecoder";
import toast from "react-hot-toast";
const { ethereum } = window;
import axios from "axios";

export const registerBrand = async (brandName, brandLogoFile) => {
    try {
      if (!ethereum){
        toast.error("Make sure you have metamask installed");
        return;

      } 
      console.log(brandLogoFile);

      const formData = new FormData();
      formData.append("brandLogo", brandLogoFile);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brand/uploadBrandLogo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        const brandLogoUrl = response?.data?.url;

        const { contract, provider } = getContract();

        try {
          await contract.callStatic.registerBrand(brandName, brandLogoUrl);
        } catch (staticCallError) {
          //console.log(staticCallError.error.data.data);
          const revertReason = parseRevertReason(
            staticCallError.error.data.data
          );
          console.error(`Revert reason: ${revertReason}`);
          toast.error(revertReason);

          return;
        }

        const tx = await contract.registerBrand(brandName, brandLogoUrl);
        await tx.wait();

        const receipt = await provider.getTransactionReceipt(tx.hash);
        console.log(receipt);

        const brandRegisteredEvent = contract.interface.parseLog(
          receipt.logs[0]
        );
        const brandId = brandRegisteredEvent.args.brandId;
        const brand_name = brandRegisteredEvent.args.name;

        console.log("Logo uploaded successfully!");
        console.log("BrandId: ", brandId.toString());
        console.log("Brand Name: ", brand_name);
        toast.success(`${brand_name} brand registered successfully!`)

        console.log(brandRegisteredEvent);
      } else {
        console.log("Error uploading brand logo!");
      }
    } catch (error) {
      console.log("Error registering brand!", error);
      console.error(error);
    }
  };