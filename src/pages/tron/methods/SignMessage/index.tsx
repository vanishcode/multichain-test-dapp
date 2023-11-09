import Item from '@/components/Item';

export default function SignMessage() {
  const handleClick = async ({ message }: any) => {
    const signature = await window.tronWeb.trx.signMessage(message);
    return signature;
  };

  return (
    <Item
      name="signMessage"
      value={{ message: 'Hello World' }}
      onClick={handleClick}
    />
  );
}
