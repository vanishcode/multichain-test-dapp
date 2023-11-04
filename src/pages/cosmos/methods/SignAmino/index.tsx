import { Alert, Button, Form, Input, notification, Space } from 'antd';

import Wrapper from '@/components/Wrapper';
import { useState } from 'react';

export default function SignArbitrary() {
  const [chainId, setChainId] = useState<string>('dydx-mainnet-1');
  const [denom, setDenom] = useState('adydx');
  const [amount, setAmount] = useState('100000000000000000');

  const [result, setResult] = useState<any>('');

  const handleClick = async () => {
    try {
      const { bech32Address: signer } = await window.keplr.getKey(chainId);
      const signature = await window.keplr.signAmino(
        chainId,
        signer,
        {
          account_number: '833360',
          chain_id: chainId,
          fee: {
            gas: '174651',
            amount: [
              {
                amount,
                denom,
              },
            ],
          },
          memo: '',
          msgs: [
            {
              type: 'sei/poolmanager/swap-exact-amount-in',
              value: {
                routes: [
                  {
                    pool_id: '1',
                    token_out_denom:
                      'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
                  },
                ],
                sender: signer,
                token_in: {
                  amount: '10000',
                  denom,
                },
                token_out_min_amount: '545',
              },
            },
          ],
          sequence: '20',
        },
        { preferNoSetFee: true },
      );
      setResult(JSON.stringify(signature));
    } catch (error: Error | string | any) {
      notification.error({
        message: error.message || error,
      });
    }
  };

  return (
    <Wrapper name="SignAmino">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ chainId, denom, amount }}
        onValuesChange={({ chainId, denom, amount }) => {
          if (chainId) {
            setChainId(chainId);
          }
          if (denom) {
            setDenom(denom);
          }
          if (amount) {
            setAmount(amount);
          }
        }}
        autoComplete="off"
      >
        <Form.Item label="chainId" name="chainId">
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
        <Button onClick={handleClick}>Sign Amino</Button>
      </Form.Item>

      {result && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message={result} type="info" />
        </Space>
      )}
    </Wrapper>
  );
}
