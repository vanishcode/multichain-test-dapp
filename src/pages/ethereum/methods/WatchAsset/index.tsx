import Wrapper from '@/components/Wrapper';
import { Button, Form, Input, notification, Typography } from 'antd';
import { useState } from 'react';

export default function WatchAsset() {
  const [params, setParams] = useState<any>({
    type: 'ERC20',
    options: {
      address: '0x6982508145454ce325ddbe47a25d4ec3d2311933',
      symbol: 'PEPE',
      decimals: 18,
      image: 'https://static.coinall.ltd/cdn/wallet/logo/PEPE-20230814.png',
    },
  });
  const [result, setResult] = useState<any>('');

  const handleClick = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }],
      });
      const result = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params,
      });
      setResult(result || 'ok');
    } catch (error: Error | string | any) {
      notification.error({
        message: error.message || error,
      });
    }
  };
  return (
    <Wrapper name="wallet_watchAsset">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          address: params.options.address,
          symbol: params.options.symbol,
          decimals: params.options.decimals,
          image: params.options.image,
        }}
        onValuesChange={(values) => {
          setParams({
            ...params,
            options: {
              ...params.options,
              address: values.address,
              symbol: values.symbol,
              decimals: values.decimals,
              image: values.image,
            },
          });
        }}
        autoComplete="off"
      >
        <Form.Item label="address" name="address">
          <Input />
        </Form.Item>

        <Form.Item label="symbol" name="symbol">
          <Input />
        </Form.Item>

        <Form.Item label="decimals" name="decimals">
          <Input />
        </Form.Item>

        <Form.Item label="image" name="image">
          <Input />
        </Form.Item>

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
          <Button onClick={handleClick} block>
            Add Token
          </Button>
        </Form.Item>
      </Form>

      <Typography.Paragraph>{result}</Typography.Paragraph>
    </Wrapper>
  );
}
