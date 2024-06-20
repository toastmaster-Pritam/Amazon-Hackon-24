import { ethers } from "ethers";
import abi from "./AmazonSupplyChain.json"

const contractABI = abi.abi;

export const getContract = () => {
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