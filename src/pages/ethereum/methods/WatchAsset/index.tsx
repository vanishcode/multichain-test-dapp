import Item from '@/components/Item';

export default function WatchAsset() {
  const signParams = {
    chainId: '0x1',
    address: '0x6982508145454ce325ddbe47a25d4ec3d2311933',
    symbol: 'PEPE',
    decimals: 18,
    image: 'https://static.coinall.ltd/cdn/wallet/logo/PEPE-20230814.png',
  };

  const handleClick = async ({
    chainId,
    address,
    symbol,
    decimals,
    image,
  }: any) => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
    const result = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          symbol,
          decimals,
          image,
        },
      },
    });
    return result;
  };

  return (
    <Item name="wallet_watchAsset" value={signParams} onClick={handleClick} />
  );
}
