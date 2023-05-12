import { ethers, providers } from "ethers";
import { erc20ABI } from "wagmi";

export const getContract = ({
  tokenContract,
  abi,
  sign,
}: {
  tokenContract: `0x${string}`;
  abi: any;
  sign: any;
}) => {
  return new ethers.Contract(tokenContract, abi, sign);
};

export const sendToken = async ({
  network,
  tokenContract,
  toAddress,
  signer,
  amount,
}: {
  network: any;
  provider: any;
  signer: any;
  tokenContract: `0x${string}`;
  toAddress: `0x${string}`;
  amount: any;
}) => {
  // Configuring the connection to an Ethereum node
  // const network = process.env.ETHEREUM_NETWORK;
  // const provider = new ethers.providers.InfuraProvider(
  //   network,
  //   process.env.INFURA_PROJECT_ID
  // );
  const provider = providers.getDefaultProvider();

  // Define the ERC-20 token contract
  const contract = getContract({ tokenContract, abi: erc20ABI, sign: signer });

  // Creating a signing account from a private key
  // const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

  // Define and parse token amount. Each token has 18 decimal places. In this example we will send 1 LINK token
  // const amount = ethers.utils.parseUnits("1.0", 18);

  //Connect to a signer so that you can pay to send state changing txs
  console.log(
    `Func: sendToken - PARAMS: {
    network,
    tokenContract,
    toAddress,
    signer,
    amount,
  }`,
    {
      network,
      tokenContract,
      toAddress,
      signer,
      amount,
      provider,
      contract,
    }
  );

  try {
    //Define tx and transfer token amount to the destination address
    const tx = await contract.transfer(
      toAddress,
      // ethers.utils.parseUnits(amount, 18)
      ethers.utils.parseUnits(amount, 18)
    );

    console.log("Mining transaction...");
    console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
    // Waiting for the transaction to be mined
    const receipt = await tx.wait();
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);
  } catch (err) {
    console.log(`Func: sendToken - PARAMS: err`, err);
  }
};
