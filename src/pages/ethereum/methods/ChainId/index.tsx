import Item from '@/components/Item';

export default function ChainId() {
  const handleClick = async () => {
    const result = await window.ethereum.request({
      method: 'eth_chainId',
      params: [],
    });
    return result;
  };

  return <Item name="eth_chainId" onClick={handleClick} />;
}
