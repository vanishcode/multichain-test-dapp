import Item from '@/components/Item';
import { keplrConnect } from '@/utils/connect';
import { useMount } from 'ahooks';
import { SignMode } from 'cosmjs-types/cosmos/tx/signing/v1beta1/signing';
import {
  AuthInfo,
  Fee,
  SignerInfo,
  TxBody,
} from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import Long from 'long';
import { useState } from 'react';

import { MsgSend } from '../../utils/tx';

export default function SignDirect() {
  const value = {
    coinId: 21500,
    chainId: 'injective-1',
    denom: 'inj',
    amount: '1500000000000000',
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
        setFeeAmount(
          res.data.info.feeAmount > '180000000000000'
            ? res.data.info.feeAmount
            : '180000000000000',
        );
        setGasLimit(res.data.info.gasLimit);
      });
  });

  const buildTx = (
    from: string,
    to: string,
    denom: string,
    amount: string,
    sequence: string,
  ) => {
    const bodyBytes = TxBody.encode(
      TxBody.fromPartial({
        messages: [
          {
            typeUrl: '/cosmos.bank.v1beta1.MsgSend',
            value: MsgSend.encode({
              fromAddress: from,
              toAddress: to,
              amount: [
                {
                  denom,
                  amount,
                },
              ],
            }).finish(),
          },
        ],
        memo: 'sign direct',
      }),
    ).finish();
    const authInfoBytes = AuthInfo.encode({
      signerInfos: [
        SignerInfo.fromPartial({
          // Pub key is ignored.
          // It is fine to ignore the pub key when simulating tx.
          // However, the estimated gas would be slightly smaller because tx size doesn't include pub key.
          modeInfo: {
            single: {
              mode: SignMode.SIGN_MODE_DIRECT,
            },
            multi: undefined,
          },
          sequence: BigInt(sequence),
        }),
      ],
      fee: Fee.fromPartial({
        amount: [{ denom: feeDenom, amount: feeAmount }],
        gasLimit: BigInt(gasLimit),
      }),
    }).finish();
    return [bodyBytes, authInfoBytes];
  };

  const handleClick = async ({ chainId, to, denom, amount }: any) => {
    const { bech32Address: from } = await window.keplr.getKey(chainId);
    const [bodyBytes, authInfoBytes] = buildTx(
      from,
      to,
      denom,
      amount,
      sequence,
    );
    const signature = await window.keplr.signDirect(chainId, from, {
      /** SignDoc bodyBytes */
      bodyBytes,
      /** SignDoc authInfoBytes */
      authInfoBytes,
      /** SignDoc chainId */
      chainId,
      /** SignDoc accountNumber */
      accountNumber: Long.fromString(accountNumber),
    });
    // for test
    window.signDirectResult = signature;
    return signature;
  };

  return <Item name="signDirect" value={value} onClick={handleClick} />;
}
