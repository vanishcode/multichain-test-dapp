import Item from '@/components/Item';

export default function BlockNumber() {
  const handleClick = async () => {
    const result = await window.ethereum.request({
      method: 'eth_blockNumber',
      params: [],
    });
    return result;
  };

  return <Item name="eth_blockNumber" onClick={handleClick} />;
}
