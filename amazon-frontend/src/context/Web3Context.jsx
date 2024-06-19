"use client";
import { useContext, createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../utils/AmazonSupplyChain.json";
import axios from "axios";
import { parseRevertReason } from "@/utils/errorDecoder";

const Web3Context = createContext();
const contractABI = abi.abi;
const { ethereum } = window;

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractABI,
    signer
  );

  return {
    contract,
    provider,
  };
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Make sure you have metamask installed");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setAccount(accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Make sure you have metamask installed");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const registerUser = async (role, name, email, phoneNumber) => {
    try {
      if (!ethereum) return alert("Make sure you have metamask installed");
      const { contract } = getContract();
      const tx = await contract.registerUser(role, name, email, phoneNumber);
      const receipt = await tx.wait();

      console.log("User registered successfully!");
      console.log(receipt);
    } catch (error) {
      console.log(error);
    }
  };

  const registerBrand = async (brandName, brandLogoFile) => {
    try {
      if (!ethereum) return alert("Make sure you have MetaMask installed");
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
          alert(revertReason);

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

        console.log(brandRegisteredEvent);
      } else {
        console.log("Error uploading brand logo!");
      }
    } catch (error) {
      console.log("Error registering brand!", error);
      console.error(error);
    }
  };

  const registerProduct = async (productname, productDetails, brandId) => {
    try {
      if (!ethereum) return alert("Make sure you have metamask installed");
      const { contract } = getContract();
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
      const productId = productRegisteredEvent.args.productId;
      const product_name = productRegisteredEvent.args.name;

      console.log("Product registered successfully!");
      console.log("ProductId: ", productId.toString());
      console.log("Product Name: ", product_name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        account,
        registerUser,
        registerBrand,
        registerProduct,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  return useContext(Web3Context);
};
