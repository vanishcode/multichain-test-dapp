import { Alert, Button, Form, Input, notification, Space } from 'antd';
import { useState } from 'react';

import Wrapper from '@/components/Wrapper';

export default function SignArbitrary() {
  const [chainId, setChainId] = useState<string>('celestia');
  const [message, setMessage] = useState('Hello World');
  const [result, setResult] = useState<any>('');

  const handleClick = async () => {
    try {
      const { bech32Address: signer } = await window.keplr.getKey(chainId);
      const signature = await window.keplr.signArbitrary(
        chainId,
        signer,
        message,
      );
      setResult(JSON.stringify(signature));
    } catch (error: Error | string | any) {
      notification.error({
        message: error.message || error,
      });
    }
  };

  return (
    <Wrapper name="SignArbitrary">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ chainId, message }}
        onValuesChange={({ chainId, message }) => {
          if (chainId) {
            setChainId(chainId);
          }
          if (message) {
            setMessage(message);
          }
        }}
        autoComplete="off"
      >
        <Form.Item label="chainId" name="chainId">
          <Input />
        </Form.Item>
        <Form.Item label="message" name="message">
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
        <Button onClick={handleClick}>Sign Arbitrary</Button>
      </Form.Item>

      {result && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message={result} type="info" />
        </Space>
      )}
    </Wrapper>
  );
}
