import Item from '@/components/Item';
import { solanaConnect } from '@/utils/connect';

export default function SignMessage() {
  const handleClick = async ({ message }: any) => {
    await solanaConnect();

    const encodedMessage = new TextEncoder().encode(message);
    const signature = await window.phantom.solana.signMessage(
      encodedMessage,
      'utf8',
    );

    return signature;
  };

  return (
    <Item
      name="signMessage"
      value={{ message: 'Hello solana' }}
      onClick={handleClick}
    />
  );
}
