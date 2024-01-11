import Item from '@/components/Item';

export default function VerifyMessageV1() {
  const handleClick = async () => {
    const result = await window.tronWeb.trx.verifyMessage(
      window.tronSignMessageV1Message,
      window.tronSignMessageV1Result,
      window.tronWeb.defaultAddress.base58,
    );
    return result;
  };

  return <Item name="verifyMessageV1" onClick={handleClick} />;
}
