import Web3 from "web3";
import { utils } from "ethers";

type TAccount = `0x${string}`[] | undefined;
export const getAccount = async () => {
  const wallet: any = window.ethereum;
  const web3 = new Web3(wallet);

  const accounts: TAccount = await wallet?.request({
    method: "eth_requestAccounts",
  });

  return { account: accounts?.[0], web3 };
};

export const sign = async () => {
  try {
    const { account, web3 } = await getAccount();
    await web3.eth.sign("hihihi", account as string);
  } catch (err) {
    console.log(`Func: sign - PARAMS: err`, err);
  }
};

export const swap = async () => {
  try {
    const { account, web3 } = await getAccount();
  } catch (err) {
    console.log(`Func: swap - PARAMS: err`, err);
  }
};

export const send = async ({
  debouncedTo,
  value,
}: {
  debouncedTo: string;
  value: string;
}) => {
  try {
    const { account, web3 } = await getAccount();
    const receipt = await web3.eth.sendTransaction({
      from: account,
      to: debouncedTo,
      value: utils.parseEther(value || "0").toString(),
    });
    console.log(`Func: send - PARAMS: receipt`, receipt);
  } catch (err) {
    console.log(`Func: send - PARAMS: err`, err);
  }
};
