const path = require("path");
const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config")

async function deployTalkaway1155(chainId) {
    
    // ethers is available in the global scope
    const [deployer] = await ethers.getSigners();
    const deployerAddress = await deployer.getAddress();

    console.log("Deploying the ERC-1155 contract with the account:", deployerAddress);
    const Talkaway1155 = await ethers.getContractFactory("Talkaway1155");
    const erc1155 = await Talkaway1155.deploy();    
    
    console.log("NFT (ERC-1155) contract address:", erc1155.address);
    
    await erc1155.deployed();
    
    // We also save the contract's artifacts and address in the frontends directories
    saveFrontendFiles(erc1155,1);    

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
      await run("verify:verify", {
          address: erc1155.address
      })
    }
}


function saveFrontendFiles(erc, template=0) {
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
      path.join(contractsDir, "contract-erc1155-address.json"),
      JSON.stringify({ Talkaway1155: erc.address }, undefined, 2)
    );
    
    const TalkawayERC1155Artifact = artifacts.readArtifactSync("Talkaway1155");
    
    fs.writeFileSync(
      path.join(contractsDir, "Talkaway1155.json"),
      JSON.stringify(TalkawayERC1155Artifact, null, 2)
    );        
  }

module.exports = {
  deployTalkaway1155,
}
