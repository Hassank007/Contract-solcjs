// const fs = require('fs');
// const ethers = require('ethers');

import fs from "fs";
import { ethers, JsonRpcProvider } from "ethers";
import {} from 'dotenv/config'

async function main() {

  // Json Rpc Provider - Connecting to local blockchain
  const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

  // Connect to wallet to sign transactions
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // const encryptedJSON = fs.readFileSync("./.encryptedKey.json","utf8")
  // let wallet =  ethers.Wallet.fromEncryptedJsonSync(encryptedJSON,process.env.PASSWORD);
  // wallet = await wallet.connect(provider);
  const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync("SimpleStorage_sol_SimpleStorage.bin", "utf8");

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, Please wait...");

  const contract = await contractFactory.deploy();
  const Address = contract.getAddress();
   console.log(`Contract address is : ${Address}`);

  //
  let currentFavoriteNumber = await contract.retrieve
  console.log(`Current Favorite Number: ${currentFavoriteNumber}`)
  console.log("Updating favorite number...")
  let transactionResponse = await contract.store(7)
  let transactionReceipt = await transactionResponse.wait()
  currentFavoriteNumber = await contract.retrieve()
  console.log(`New Favorite Number: ${currentFavoriteNumber}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
