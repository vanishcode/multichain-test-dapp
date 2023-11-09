import Item from '@/components/Item';

export default function PersonalSign() {
  const handleClick = async ({ message }: any) => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const from = accounts[0];
    const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`;
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [msg, from, 'Example password'],
    });
    return signature;
  };

  return (
    <Item
      name="signMessage"
      value={{ message: 'Hello world, form personal_sign' }}
      onClick={handleClick}
    />
  );
}
