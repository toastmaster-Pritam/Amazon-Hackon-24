"use client";
import { useContext, createContext, useEffect, useState } from "react";
import { registerUser } from "@/services/registerUser";
import { registerBrand } from "@/services/registerBrand";
import { registerProduct } from "@/services/registerProduct";
import { requestOwnership } from "@/services/requestOwnership";
import { approveOwnership } from "@/services/approveOwnership";
import { whitelistBrand } from "@/services/whitelistBrand";
import { removeWhitelistedBrand } from "@/services/removeWhitelistedBrand";

const Web3Context = createContext();
const { ethereum } = window;

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
        requestOwnership,
        approveOwnership,
        whitelistBrand,
        removeWhitelistedBrand,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  return useContext(Web3Context);
};
