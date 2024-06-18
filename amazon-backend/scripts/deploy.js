const hre = require("hardhat");

async function main() {

    const contractInstance = await hre.ethers.getContractFactory("AmazonSupplyChain");
    const contract = await contractInstance.deploy();

    await contract.waitForDeployment();


    console.log(`Contract deployed to: ${await contract.getAddress()}`);
  
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
