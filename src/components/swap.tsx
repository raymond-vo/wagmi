export const SwapInput = ({
  tokens,
  selected,
}: {
  tokens: { value: string; name: string }[];
  selected: string;
}) => {
  return (
    <>
      <div className="flex gap-2">
        <select
          defaultValue={selected}
          className="w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {tokens.map((item) => (
            <option value={item.value} key={item.value}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          id="last_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </>
  );
};

export const Swap = () => {
  const tokens = [
    {
      value: "0x5e9997684d061269564F94E5d11Ba6Ce6Fa9528C",
      name: "VNDT",
    },
    {
      value: "0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3",
      name: "TRON",
    },
  ];
  return (
    <div className="flex gap-4 flex-col px-4 mt-4">
      <SwapInput
        tokens={tokens}
        selected="0x5e9997684d061269564F94E5d11Ba6Ce6Fa9528C"
      />
      <SwapInput
        tokens={tokens}
        selected="0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Swap
      </button>
    </div>
  );
};
