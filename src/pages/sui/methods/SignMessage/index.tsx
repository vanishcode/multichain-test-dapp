import Item from '@/components/Item';
import { useWalletKit } from '@mysten/wallet-kit';

export default function SignMessage() {
  const { signMessage } = useWalletKit();

  const handleClick = async ({ message }: any) => {
    const encoder = new TextEncoder();
    const u8array = new Uint8Array(20);
    encoder.encodeInto(message as string, u8array);

    const signature = await signMessage({ message: u8array });
    return signature;
  };

  return (
    <Item
      name="SignMessage"
      value={{ message: 'Hello World!' }}
      onClick={handleClick}
    />
  );
}
