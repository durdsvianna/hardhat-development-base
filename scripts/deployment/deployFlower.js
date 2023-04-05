const path = require("path");
const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config")

async function deployFlower(chainId) {
    
    // ethers is available in the global scope
    const [deployer] = await ethers.getSigners();
    const deployerAddress = await deployer.getAddress();
    console.log("Deploying the token contract with the account:", await deployer.getAddress());
    
    const Flower = await ethers.getContractFactory("Flower");
    const flower = await Flower.deploy(3);
    await flower.deployed();
    console.log("NFT contract address:", flower.address);
    
    // We also save the contract's artifacts and address in the frontends directories
    saveFrontendFiles(flower,0);
    saveFrontendFiles(flower,1);
    
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: flower.address
        })
    }
}


function saveFrontendFiles(flower, template=0) {
    const fs = require("fs");
    var contractsDir = path.join(__dirname, "../../", "frontend", "src", "contracts");
    if (template > 0){
      contractsDir = path.join(__dirname, "../../", "frontend"+template, "src", "contracts");
    }
    
    console.log('Saving frontend files...')
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      path.join(contractsDir, "contract-flower-address.json"),
      JSON.stringify({ Flower: flower.address }, undefined, 2)
    );
  
    const FlowerArtifact = artifacts.readArtifactSync("Flower");
  
    fs.writeFileSync(
      path.join(contractsDir, "Flower.json"),
      JSON.stringify(FlowerArtifact, null, 2)
    );
  }

module.exports = {
  deployFlower,
}
