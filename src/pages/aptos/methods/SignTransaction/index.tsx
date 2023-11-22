import Item from '@/components/Item';
import { aptosConnect } from '@/utils/connect';
import { useMount } from 'ahooks';
import { useState } from 'react';

export default function SignTransaction() {
  const [value, setValue] = useState({
    to: '',
    amount: '1000',
  });

  useMount(async () => {
    await aptosConnect();
    const { address } = await window.aptos.account();
    setValue({
      ...value,
      to: address,
    });
  });

  const handleClick = async ({ to, amount }: any) => {
    const transaction = {
      arguments: [to, amount],
      function: '0x1::coin::transfer',
      type: 'entry_function_payload',
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
    };

    const signature = await window.aptos.signAndSubmitTransaction(transaction);

    return signature;
  };

  return <Item name="signTransaction" value={value} onClick={handleClick} />;
}
