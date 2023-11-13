import Item from '@/components/Item';
import { keplrConnect } from '@/utils/connect';

export default function VerifyArbitrary() {
  const value = {
    chainId: 'injective-1',
    message: 'Hello World',
  };
  const handleClick = async ({ chainId, message }: any) => {
    await keplrConnect();
    const { bech32Address: signer } = await window.keplr.getKey(chainId);
    const signature = await window.keplr.verifyArbitrary(
      chainId,
      signer,
      message,
      // for test
      window.signArbitraryResult,
    );
    return signature;
  };

  return <Item name="verifyArbitrary" value={value} onClick={handleClick} />;
}
