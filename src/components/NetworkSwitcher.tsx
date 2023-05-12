import { useNetwork, useSwitchNetwork } from "wagmi";

export function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
    <div>
      <div>
        Connected to {chain?.name ?? chain?.id}
        {chain?.unsupported && " (unsupported)"}
      </div>
      <div className="bg-amber-500">
        ví 1: 0x56302Dd0C5186A1eD9Bd00F47542163aF015B630
      </div>
      <div className="bg-amber-200">
        ví 2: 0x0f5ba047B137DDEB7673aFCa7d69622E3bCa9aF9
      </div>

      {switchNetwork && (
        <div className="flex gap-4">
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                key={x.id}
                onClick={() => switchNetwork(x.id)}
              >
                {x.name}
                {isLoading && x.id === pendingChainId && " (switching)"}
              </button>
            )
          )}
        </div>
      )}

      <div>{error && error.message}</div>
    </div>
  );
}
