import Item from '@/components/Item';
import { tronConnect } from '@/utils/connect';

export default function SignTransaction() {
  const value = {
    to: 'TGvyvtbrJDwDxSYy9LDUJWtP8XFncj2Xd7',
    amount: 10000,
  };

  const handleClick = async ({ to, amount }: any) => {
    await tronConnect();
    const transaction = await window.tronWeb.transactionBuilder.sendTrx(
      to,
      amount,
      window.tronWeb.defaultAddress.base58,
    );
    const signature = await window.tronWeb.trx.signTransaction(transaction);
    return signature;
  };

  return <Item name="signTransaction" value={value} onClick={handleClick} />;
}
