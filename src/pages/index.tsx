import { useAccount, useBalance } from "wagmi";

import { Account, Connect, NetworkSwitcher } from "../components";
import { SendTransaction } from "../components/send-transaction";
import React from "preact/compat";
import { MintNFT } from "../components/contract-write";

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
        </>
      )}
    </>
  );
}

export default Page;
