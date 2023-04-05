const path = require("path");
const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config")

async function deployTalkaway721(chainId) {
    
    // ethers is available in the global scope
    const [deployer] = await ethers.getSigners();
    const deployerAddress = await deployer.getAddress();

    console.log("Deploying the ERC-721 contract with the account:", deployerAddress);
    const TalkawayERC721 = await ethers.getContractFactory("TalkawayERC721");
    const erc721 = await TalkawayERC721.deploy();
    console.log("NFT (ERC-721) contract address:", erc721.address);
    await erc721.deployed();
    
    // We also save the contract's artifacts and address in the frontends directories
    saveFrontendFiles(erc721,1);
    
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: erc721.address
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
      path.join(contractsDir, "contract-erc721-address.json"),
      JSON.stringify({ TalkawayERC721: erc.address }, undefined, 2)
    );
    
    const TalkawayERC721Artifact = artifacts.readArtifactSync("TalkawayERC721");
    
    fs.writeFileSync(
      path.join(contractsDir, "TalkawayERC721.json"),
      JSON.stringify(TalkawayERC721Artifact, null, 2)
    );
        
  }

module.exports = {
  deployTalkaway721,
}
