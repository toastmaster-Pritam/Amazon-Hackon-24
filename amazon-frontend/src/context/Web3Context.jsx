"use client";
import { useContext, createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../utils/AmazonSupplyChain.json";
import axios from "axios";

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
  }
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
     const receipt= await tx.wait();

      console.log("User registered successfully!");
      console.log(receipt)
    } catch (error) {
      console.log(error);
    }
  };


  const registerBrand = async (brandName, brandLogoFile) => {
    try {
      if (!ethereum) return alert("Make sure you have metamask installed");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brand/upload`,
        brandLogoFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const brandLogoUrl = response.data.data.brandLogo;
      //   const {contract,provider} = getContract();

      //   const tx = await contract.registerBrand(brandName, brandLogoUrl);

      //    await tx.wait();

      //    const receipt = await provider.getTransactionReceipt(tx.hash);

      //    const brandRegisteredEvent = contract.interface.parseLog(
      //     receipt.logs[0]
      // );
      // const brandId = brandRegisteredEvent.args.brandId;

       
        console.log("Logo uploaded successfully!");
        console.log("BrandLogo : ", brandLogoUrl.toString());
      } else {
        console.log("error uploading brand logo!");
      }
    } catch (error) {
      console.log("error registering brand!", error);
    }
  };


  {/* 
  const registerProduct = async (
    productname,
    productDetails,
    productPrice,
    brandId
  ) => {
    try {
      if (!ethereum) return alert("Make sure you have metamask installed");
      const {contract} = getContract();
      const tx = await contract.registerProduct(
        productname,
        productDetails,
        productPrice,
        brandId
      );
      const receipt = await tx.wait();
      

      console.log("Product registered successfully!");
       console.log(receipt)
      
    } catch (error) {
      console.log(error);
    }
  };
  */}

  

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
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  return useContext(Web3Context);
};
