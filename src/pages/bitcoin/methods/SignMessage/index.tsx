import Item from '@/components/Item';

export default function SignMessage() {
  const handleClick = async (values: any) => {
    const { address } = await window.okxwallet.bitcoin.connect();
    const signature = await window.okxwallet.bitcoin.signMessage(
      values.message,
      {
        from: address,
      },
    );
    return signature;
  };

  return (
    <Item
      name="signMessage"
      value={{ message: 'Hello world' }}
      onClick={handleClick}
    />
  );
}
