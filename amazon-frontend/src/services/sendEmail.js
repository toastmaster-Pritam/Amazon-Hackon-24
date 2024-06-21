import axios from "axios";
import { getUserDetails } from "./getUserDetails";
import toast from "react-hot-toast";

export const sendEmail = async (
  address,
  uniqueHash,
  requesterAddress,
  productId,
  productName,
  brandId,
  productImage
) => {

  
  try {
    console.log("sendEmail called with", address, uniqueHash, requesterAddress, productId, productName, brandId, productImage);
    const { name, email } = await getUserDetails(address);
    const { name: requesterName } = await getUserDetails(requesterAddress);

    console.log("Product details:", name, email, requesterName);
    

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/ownerShipTransferEmail`,
      {  
        name,
        email,
        uniqueHash,
        requesterAddress,
        requesterName,
        productId,
        productName,
        brandId,
        productImage,
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      console.log("Email sent successfully to", email);
    } else {
      toast.error(response.data.error);
    }
  } catch (error) {
    console.error("Error sending email:", error);
    toast.error("Error sending email");
  }
};
