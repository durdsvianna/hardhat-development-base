// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from 'nft.storage'


// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNEMDZDNjVBODNCRjkzQzI1ODY0Njc2RmVmRmU4NDJiZTFlODRmRTUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MDEzMDc5MDcwNiwibmFtZSI6IndlYjMtZGV2LXRlbXBsYXRlIn0.70kBwJIMIaZVuocWzh5J71gs4vB-1otjcgD2Qm83wPE'

async function getImage(imageURL) {

	const r = await fetch(imageURL)

	if (!r.ok) {
		throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
	} return r.blob()
}

async function urltoFile(url, filename, mimeType){
    return (await fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
}

async function urltoBlob(url){
    const base64Response = await fetch(url);
    const blob = await base64Response.blob();
    console.log("blob", blob)
    return blob;
}

/**
  * Reads an image file from `imagePath` and stores an NFT with the given name and description.
  * @param {uint} tokenId a token Id 
  * @param {object} image a image file
  * @param {string} name a name for the NFT
  * @param {string} description a text description for the NFT
  */
export async function storeNFT(tokenId ,image, name, description) {    
    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    const imageFile = await urltoFile(image, tokenId, "image/png")
    const imageBlob = await urltoBlob(image)
    const imageBlob1 = await getImage(image)
    // call client.store, passing in the image & metadata
    return nftstorage.store({
        imageBlob,
        name,
        description,
    })
}

