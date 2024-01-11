import Item from '@/components/Item';

export default function SignMessageV1() {
  const handleClick = async ({ hexMessage }: any) => {
    const signature = await window.tronWeb.trx.signMessage(hexMessage);

    window.tronSignMessageV1Message = hexMessage;
    window.tronSignMessageV1Result = signature;

    return signature;
  };

  return (
    <Item
      name="signMessageV1"
      value={{
        message: 'Hello World',
        hexMessage: Buffer.from('Hello World', 'utf-8').toString('hex'),
      }}
      onClick={handleClick}
    />
  );
}
