require("dotenv").config();
const ethers = require("ethers");
const {abi}= require('../artifacts/contracts/AmazonSupplyChain.sol/AmazonSupplyChain.json');
const {API_URL, PRIVATE_KEY, CONTRACT_ADDRESS} = process.env;

const provider = new ethers.JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);


module.exports = contract;