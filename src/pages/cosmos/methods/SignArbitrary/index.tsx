import Item from '@/components/Item';
import { keplrConnect } from '@/utils/connect';

export default function SignArbitrary() {
  const value = {
    chainId: 'injective-1',
    message: 'Hello World',
  };
  const handleClick = async ({ chainId, message }: any) => {
    await keplrConnect();
    const { bech32Address: signer } = await window.keplr.getKey(chainId);
    const signature = await window.keplr.signArbitrary(
      chainId,
      signer,
      message,
      { preferNoSetFee: true },
    );
    window.signArbitraryResult = signature;
    return signature;
  };

  return <Item name="signArbitrary" value={value} onClick={handleClick} />;
}
