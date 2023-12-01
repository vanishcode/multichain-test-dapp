import Item from '@/components/Item';

export default function AddEthereumChain() {
  const value = {
    chainId: '0xa869',
    chainName: 'Avalanche Fuji Testnet',
    name: 'AVAX Token',
    symbol: 'AVAX',
    decimals: 18,
    rpcUrls: ['https://rpc.ankr.com/avalanche_fuji'],
    blockExplorerUrls: ['https://testnet.snowtrace.io'],
  };

  const handleClick = async ({
    chainId,
    chainName,
    name,
    symbol,
    decimals,
    rpcUrls,
    blockExplorerUrls,
  }: any) => {
    const result = await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId,
          chainName,
          nativeCurrency: {
            name,
            symbol,
            decimals,
          },
          rpcUrls,
          blockExplorerUrls,
        },
      ],
    });
    return result;
  };

  return (
    <Item name="wallet_addEthereumChain" value={value} onClick={handleClick} />
  );
}
