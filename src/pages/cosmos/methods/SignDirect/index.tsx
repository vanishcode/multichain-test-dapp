import { Alert, Button, Form, Input, notification, Space } from 'antd';
import { SignMode } from 'cosmjs-types/cosmos/tx/signing/v1beta1/signing';
import {
  AuthInfo,
  Fee,
  SignerInfo,
  TxBody,
} from 'cosmjs-types/cosmos/tx/v1beta1/tx';

import Wrapper from '@/components/Wrapper';
import Long from 'long';
import { useState } from 'react';

export default function SignDirect() {
  const [chainId, setChainId] = useState<string>('cosmoshub-4');
  const [denom, setDenom] = useState<string>('uatom');
  const [amount, setAmount] = useState<string>('4399');
  const [to, setTo] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('666');
  const [sequence, setSequence] = useState<string>('666');

  const [result, setResult] = useState<any>('');

  const buildTx = (from: string, to: string, denom: string, amount: string) => {
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

  const handleClick = async () => {
    try {
      const { bech32Address: signer } = await window.keplr.getKey(chainId);
      const [bodyBytes, authInfoBytes] = buildTx(signer, to, denom, amount);
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
      setResult(JSON.stringify(signature));
    } catch (error: Error | string | any) {
      console.log(error);
      notification.error({
        message: error.message || error,
      });
    }
  };

  return (
    <Wrapper name="SignDirect">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ chainId, denom, amount, to, accountNumber, sequence }}
        onValuesChange={({
          chainId,
          to,
          denom,
          amount,
          accountNumber,
          sequence,
        }) => {
          if (chainId) {
            setChainId(chainId);
          }
          if (denom) {
            setDenom(denom);
          }
          if (to) {
            setTo(to);
          }
          if (amount) {
            setAmount(amount);
          }
          if (accountNumber) {
            setAccountNumber(accountNumber);
          }
          if (sequence) {
            setSequence(sequence);
          }
        }}
        autoComplete="off"
      >
        <Form.Item label="chainId" name="chainId">
          <Input />
        </Form.Item>
        <Form.Item label="accountNumber" name="accountNumber">
          <Input />
        </Form.Item>
        <Form.Item label="sequence" name="sequence">
          <Input />
        </Form.Item>
        <Form.Item label="to" name="to">
          <Input />
        </Form.Item>
        <Form.Item label="denom" name="denom">
          <Input />
        </Form.Item>
        <Form.Item label="amount" name="amount">
          <Input />
        </Form.Item>
      </Form>

      <Form.Item
        wrapperCol={{
          xxl: { offset: 8 },
          xl: { offset: 8 },
          lg: { offset: 8 },
          md: { offset: 8 },
          sm: { offset: 8 },
          xs: { offset: 0 },
        }}
      >
        <Button onClick={handleClick}>Sign Direct</Button>
      </Form.Item>

      {result && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message={result} type="info" />
        </Space>
      )}
    </Wrapper>
  );
}
