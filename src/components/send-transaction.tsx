import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useConnect,
  useContractWrite,
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
  useSigner,
} from "wagmi";
import { utils } from "ethers";
import { sendToken } from "@/web3";

export function SendTransaction() {
  const [to, setTo] = useState<`0x${string}`>(
    "0x56302Dd0C5186A1eD9Bd00F47542163aF015B630"
  );
  const [token, setToken] = useState<`0x${string}`>(
    "0x82dfb30eb546d988d94c511ae99b0f31ae9ada3a"
  );
  const [debouncedTo] = useDebounce(to, 500);

  const [amount, setAmount] = useState("0.00003");
  const [debouncedAmount] = useDebounce(amount, 500);

  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
    },
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const mock: Record<"wallet" | "walletImport" | "token", `0x${string}`> = {
    wallet: "0x56302Dd0C5186A1eD9Bd00F47542163aF015B630",
    walletImport: "0x0f5ba047B137DDEB7673aFCa7d69622E3bCa9aF9",
    token: "0x82dfb30eb546d988d94c511ae99b0f31ae9ada3a",
  };

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: sign } = useSigner();

  console.log(`Func: SendTransaction - PARAMS: useAccount()`, {
    ...useBalance({
      address: "0x0f5ba047B137DDEB7673aFCa7d69622E3bCa9aF9",
    }),
  });

  const send = async () => {
    const result = await sendToken({
      network: chain?.network,
      signer: sign,
      toAddress: mock.wallet,
      tokenContract: mock.token,
      amount: debouncedAmount,
    });
    console.log(`Func: sendToken - PARAMS: result`, result);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // sendTransaction?.();
          send();
        }}
        className="px-4 grid gap-6 mb-6 md:grid-cols-3"
      >
        <div>
          <label
            htmlFor="token"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            token
          </label>
          <input
            type="text"
            id="token"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            aria-label="Recipient"
            onChange={(e) => setToken(e.target.value as `0x${string}`)}
            placeholder="0xA0Cf…251e"
            value={token}
          />
        </div>
        <div>
          <label
            htmlFor="to"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            to
          </label>
          <input
            type="text"
            id="to"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            aria-label="Recipient"
            onChange={(e) => setTo(e.target.value as `0x${string}`)}
            placeholder="0xA0Cf…251e"
            value={to}
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            amount
          </label>
          <input
            type="text"
            id="amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            aria-label="Amount (ether)"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.05"
            value={amount}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-25"
          disabled={isLoading || !sendTransaction || !to || !amount}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
      {isSuccess && (
        <div>
          Successfully sent {amount} ether to {to}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </>
  );
}
