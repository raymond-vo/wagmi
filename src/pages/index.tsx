import { useAccount, useBalance } from "wagmi";

import {
  Account,
  Connect,
  NetworkSwitcher,
  Swap,
  MintNFT,
  SendTransaction,
} from "@/components";
import React from "preact/compat";

function Page() {
  const { isConnected, address } = useAccount();
  const { data, isError, isLoading } = useBalance({ address });
  return (
    <>
      <h1>wagmi + Next.js</h1>
      <Connect />
      <hr />
      {isConnected && (
        <>
          <Account />
          <NetworkSwitcher />
          <hr />
          <div>
            Balance: {data?.formatted} {data?.symbol}
          </div>
          <MintNFT address={address} />
          <SendTransaction />
          <Swap />
        </>
      )}
    </>
  );
}

export default Page;
