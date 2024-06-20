import { getContract } from "@/utils/web3setup";
import { parseRevertReason } from "@/utils/errorDecoder";
const { ethereum } = window;
import axios from "axios";

export const registerProduct = async (
    productname,
    productImage,
    productDetails,
    brandId
  ) => {
    try {
      if (!ethereum) return alert("Make sure you have metamask installed");
      const { contract, provider } = getContract();

      try {
        await contract.callStatic.registerProduct(
          productname,
          productDetails,
          brandId
        );
      } catch (staticCallError) {
        //console.log(staticCallError.error.data.data);
        const revertReason = parseRevertReason(staticCallError.error.data.data);
        console.error(`Revert reason: ${revertReason}`);
        alert(revertReason);

        return;
      }
      const tx = await contract.registerProduct(
        productname,
        productDetails,
        brandId
      );
      await tx.wait();

      const receipt = await provider.getTransactionReceipt(tx.hash);

      const productRegisteredEvent = contract.interface.parseLog(
        receipt.logs[0]
      );
      console.log(productRegisteredEvent)
      {/*const productId = productRegisteredEvent.args.productId;
      const product_name = productRegisteredEvent.args.name;

      console.log("Product registered successfully!");
      console.log("ProductId: ", productId.toString());
      console.log("Product Name: ", product_name);
    */}
      //upload product image
      const formData = new FormData();
      formData.append("brandLogo", productImage);

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

      const productImageUrl = response?.data?.url;
      console.log("Product Image url:", productImageUrl);
    } catch (error) {
      console.log(error);
    }
  };