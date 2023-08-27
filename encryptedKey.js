import fs from "fs";
import { ethers } from "ethers";
import {} from "dotenv/config";

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptedKeyJSON = await wallet.encryptSync(
    process.env.PASSWORD,
    
  );
  console.log(encryptedKeyJSON);
  fs.writeFileSync('./.encryptedKey.JSON', encryptedKeyJSON);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
