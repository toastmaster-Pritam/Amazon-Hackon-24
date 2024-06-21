import { getContract } from "@/utils/web3setup";
import { parseRevertReason } from "@/utils/errorDecoder";
const { ethereum } = window;
import toast from "react-hot-toast";
import axios from "axios";

export const registerProduct = async (
  productname,
  productImage,
  productDetails,
  brandId
) => {
  try {
    if (!ethereum) {
      toast.error("Make sure you have metamask installed");
      return;

    }

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

    if (response.status === 200) {
      const productImageUrl = response?.data?.url;


      const { contract, provider } = getContract();

      try {
        await contract.callStatic.registerProduct(
          productname,
          productDetails,
          brandId,
          productImageUrl
        );
      } catch (staticCallError) {
        //console.log(staticCallError);
        const revertReason = parseRevertReason(staticCallError.error.data.data);
        console.error(`Revert reason: ${revertReason}`);
        toast.error(revertReason);

        return;
      }
      const tx = await contract.registerProduct(
        productname,
        productDetails,
        brandId,
        productImageUrl
      );
      await tx.wait();

      const receipt = await provider.getTransactionReceipt(tx.hash);

      const productRegisteredEvent = contract.interface.parseLog(
        receipt.logs[0]
      );
      console.log(productRegisteredEvent)
      toast.success("Product registered successfully!");

    }
    else {
      console.log("Error in uploading image");
      toast.error("Error in uploading image");
    }

    {/*const productId = productRegisteredEvent.args.productId;
      const product_name = productRegisteredEvent.args.name;

      console.log("Product registered successfully!");
      console.log("ProductId: ", productId.toString());
      console.log("Product Name: ", product_name);
    */}


  } catch (error) {
    console.log(error);
  }
};