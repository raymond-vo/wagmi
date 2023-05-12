import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <div className="flex gap-2">
        {isConnected && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => disconnect()}
          >
            Disconnect {connector?.name}
          </button>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              key={x.id}
              onClick={() => connect({ connector: x })}
            >
              {x.name}
              {isLoading && x.id === pendingConnector?.id && " (connecting)"}
            </button>
          ))}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  );
}
