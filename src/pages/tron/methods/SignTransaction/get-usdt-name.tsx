import Item from '@/components/Item';
import { tronConnect } from '@/utils/connect';

export default function SignTransactionUSDT() {
  const contract = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

  const handleClick = async () => {
    await tronConnect();
    const hexUSDTContractAddress = window.tronWeb.address.toHex(contract);
    const hexFromAddress = window.tronWeb.defaultAddress.hex;

    const { transaction } =
      await window.tronWeb.transactionBuilder.triggerSmartContract(
        hexUSDTContractAddress,
        'name()',
        {
          feeLimit: 100000000,
        },
        [],
        hexFromAddress,
      );
    const signature = await window.tronWeb.trx.signTransaction(transaction);
    return signature;
  };

  return <Item name="signTransaction - Get USDT Name" onClick={handleClick} />;
}
