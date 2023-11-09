import { SignMode } from 'cosmjs-types/cosmos/tx/signing/v1beta1/signing';
import {
  AuthInfo,
  Fee,
  SignerInfo,
  TxBody,
} from 'cosmjs-types/cosmos/tx/v1beta1/tx';

import Item from '@/components/Item';
import Long from 'long';

export default function SignDirect() {
  const value = {
    chainId: 'cosmoshub-4',
    denom: 'uatom',
    amount: '4399',
    to: 'cosmos12nqz20dzne725py9j6n7wtx3s9579c7mnet7s8',
    accountNumber: '666',
    sequence: '666',
  };

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
            // @ts-ignore
            '@type': '/cosmos.bank.v1beta1.MsgSend',

            // @ts-ignore
            from_address: from,

            // @ts-ignore
            to_address: to,

            // @ts-ignore
            amount: [{ denom, amount }],
          },
        ],
        memo: '',
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
              mode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
            },
            multi: undefined,
          },
          sequence: BigInt(sequence),
        }),
      ],
      fee: Fee.fromPartial({
        amount: [{ denom, amount }],
      }),
    }).finish();
    return [bodyBytes, authInfoBytes];
  };

  const handleClick = async ({
    chainId,
    to,
    denom,
    amount,
    accountNumber,
    sequence,
  }: any) => {
    const { bech32Address: signer } = await window.keplr.getKey(chainId);
    const [bodyBytes, authInfoBytes] = buildTx(
      signer,
      to,
      denom,
      amount,
      sequence,
    );
    const signature = await window.keplr.signDirect(
      chainId,
      signer,
      {
        /** SignDoc bodyBytes */
        bodyBytes,
        /** SignDoc authInfoBytes */
        authInfoBytes,
        /** SignDoc chainId */
        chainId,
        /** SignDoc accountNumber */
        accountNumber: Long.fromString(accountNumber),
      },
      { preferNoSetFee: true },
    );
    return signature;
  };

  return <Item name="signDirect" value={value} onClick={handleClick} />;
}
