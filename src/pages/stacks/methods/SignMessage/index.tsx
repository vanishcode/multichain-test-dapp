import Item from '@/components/Item';
import { stacksConnect } from '@/utils/connect';

export default function SignMessage() {
  const handleClick = async ({ message }: any) => {
    await stacksConnect();

    const signature = await window.stacks.signMessage({
      message,
    });

    return signature;
  };

  return (
    <Item
      name="signMessage"
      value={{ message: 'Hello stacks' }}
      onClick={handleClick}
    />
  );
}
