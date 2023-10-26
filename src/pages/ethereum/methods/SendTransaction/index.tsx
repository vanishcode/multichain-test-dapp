import { Alert, Button, Form, Input, Space } from 'antd';
import { useState } from 'react';

import Wrapper from '@/components/Wrapper';

export default function SendTransaction() {
  const [signParams, setSignParams] = useState<Record<string, any>>({
    chainId: window.okxwallet.chainId,
    from: window.okxwallet.selectedAddress,
    to: window.okxwallet.selectedAddress,
    value: '0x5af3107a4000',
    gasPrice: '0x6fc23ac00',
    gas: '0x5208',
    data: '',
  });
  const [result, setResult] = useState<any>('');

  const handleClick = async () => {
    try {
      const result = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [signParams],
      });
      setResult(result);
    } catch (error: Error | any) {
      setResult(error.message);
    }
  };

  return (
    <Wrapper name="eth_sendTransaction">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={signParams}
        onValuesChange={(values) => {
          setSignParams(Object.assign({}, signParams, values));
        }}
        autoComplete="off"
      >
        <Form.Item label="chainId" name="chainId">
          <Input />
        </Form.Item>

        <Form.Item label="from" name="from">
          <Input />
        </Form.Item>

        <Form.Item label="to" name="to">
          <Input />
        </Form.Item>

        <Form.Item label="value" name="value">
          <Input />
        </Form.Item>

        <Form.Item label="gas" name="gas">
          <Input />
        </Form.Item>

        <Form.Item label="gasPrice" name="gasPrice">
          <Input />
        </Form.Item>

        <Form.Item label="data" name="data">
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
            Send Transaction
          </Button>
        </Form.Item>
      </Form>

      {result && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message={result} type="info" />
        </Space>
      )}
    </Wrapper>
  );
}
