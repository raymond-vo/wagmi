import * as React from "react";
import { useDebounce } from "use-debounce";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { BigNumber, utils } from "ethers";
import Web3 from "web3";
import { send } from "../services";
import { async } from "rxjs";

export function SendTransaction() {
  const [to, setTo] = React.useState(
    "0x56302Dd0C5186A1eD9Bd00F47542163aF015B630"
  );
  const [debouncedTo] = useDebounce(to, 500);

  const [amount, setAmount] = React.useState("0.00003");
  const [debouncedAmount] = useDebounce(amount, 500);

  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
    },
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess, isError, error } = useWaitForTransaction({
    hash: data?.hash,
  });

  const sendToken = async () => {
    await send({ debouncedTo, value: debouncedAmount });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendToken();
      }}
    >
      <input
        aria-label="Recipient"
        onChange={(e) => setTo(e.target.value)}
        placeholder="0xA0Cf…251e"
        value={to}
      />
      <input
        aria-label="Amount (ether)"
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.05"
        value={amount}
      />
      <button disabled={isLoading || !sendTransaction || !to || !amount}>
        {isLoading ? "Sending..." : "Send"}
      </button>
      {isSuccess && (
        <div>
          Successfully sent {amount} ether to {to}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </form>
  );
}
