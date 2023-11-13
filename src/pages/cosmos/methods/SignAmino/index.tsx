import Item from '@/components/Item';
import { keplrConnect } from '@/utils/connect';
import { useMount } from 'ahooks';
import { useState } from 'react';

export default function SignArbitrary() {
  const value = {
    coinId: 21500,
    chainId: 'injective-1',
    denom: 'inj',
    amount: '1200000000000000',
    from: 'inj1ywqe8057srngat8rtz95tkx0ffl2urarkegcc8',
    to: 'inj1ywqe8057srngat8rtz95tkx0ffl2urarkegcc8',
  };

  const [feeDenom, setFeeDenom] = useState('inj');
  const [feeAmount, setFeeAmount] = useState('180000000000000');
  const [gasLimit, setGasLimit] = useState('200000');
  const [accountNumber, setAccountNumber] = useState('630104');
  const [sequence, setSequence] = useState('279');

  useMount(() => {
    keplrConnect();

    fetch(
      `https://wallet.okex.org/v1/deposit/plugin/coin/${value.coinId}/address/${value.to}/signInfo`,
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        setAccountNumber(res.data.info.accountNumber);
        setSequence(res.data.info.sequence);
        setFeeDenom(res.data.info.feeDemon);
        setFeeAmount(res.data.info.feeAmount);
        setGasLimit(res.data.info.gasLimit);
      });
  });

  const handleClick = async ({ chainId, denom, amount, from, to }: any) => {
    await keplrConnect();
    await window.keplr.enable(chainId);
    const { bech32Address: signer } = await window.keplr.getKey(chainId);

    const signDoc = {
      chain_id: chainId,
      account_number: accountNumber,
      sequence,
      fee: {
        amount: [{ amount: feeAmount, denom: feeDenom }],
        gas: gasLimit,
      },
      msgs: [
        {
          type: '/cosmos.bank.v1beta1.MsgSend',
          value: {
            from_address: from,
            to_address: to,
            amount: [
              {
                denom,
                amount,
              },
            ],
          },
        },
      ],
      memo: 'sign amino',
    };
    const signature = await window.keplr.signAmino(chainId, signer, signDoc, {
      preferNoSetFee: true,
    });
    return signature;
  };

  return <Item name="signAmino" value={value} onClick={handleClick} />;
}
