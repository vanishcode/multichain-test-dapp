import Item from '@/components/Item';
import { tronConnect } from '@/utils/connect';

export default function SignTransactionUSDT() {
  const handleClick = async ({ to, feeLimit, amount }: any) => {
    await tronConnect();

    const hexToAddress = window.tronWeb.address.toHex(to);
    const hexUSDTContractAddress = window.tronWeb.address.toHex(
      'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    );
    const hexFromAddress = window.tronWeb.defaultAddress.hex;

    const { transaction } =
      await window.tronWeb.transactionBuilder.triggerSmartContract(
        hexUSDTContractAddress,
        'transfer(address,uint256)',
        {
          feeLimit,
        },
        [
          {
            type: 'address',
            value: hexToAddress,
          },
          { type: 'uint256', value: amount },
        ],
        hexFromAddress,
      );
    const signature = await window.tronWeb.trx.signTransaction(transaction);
    return signature;
  };

  return (
    <Item
      name="signTransaction - Send USDT"
      value={{
        to: 'TGvyvtbrJDwDxSYy9LDUJWtP8XFncj2Xd7',
        feeLimit: 100000000,
        amount: 100,
      }}
      onClick={handleClick}
    />
  );
}
