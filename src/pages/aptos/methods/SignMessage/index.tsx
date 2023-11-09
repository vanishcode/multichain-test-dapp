import Item from '@/components/Item';
import { aptosConnect } from '@/utils/connect';

export default function SignMessage() {
  const handleClick = async ({ message, nonce }: any) => {
    await aptosConnect();

    const signature = await window.aptos.signMessage({
      message,
      nonce,
    });

    return signature;
  };

  return (
    <Item
      name="signMessage"
      value={{ message: 'Hello aptos', nonce: '142857' }}
      onClick={handleClick}
    />
  );
}
