import Item from '@/components/Item';

export default function SwitchEthereumChain() {
  const handleClick = async ({ chainId }: any) => {
    const result = await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
    return result;
  };

  return (
    <Item
      name="wallet_switchEthereumChain"
      value={{ chainId: '0x42' }}
      onClick={handleClick}
    />
  );
}
