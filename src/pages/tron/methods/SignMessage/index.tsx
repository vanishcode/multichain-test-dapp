import { Button, Form, Input, notification, Typography } from 'antd';
import { useState } from 'react';

import Wrapper from '@/components/Wrapper';

export default function SignMessage() {
  const [message, setMessage] = useState('Hello World');
  const [result, setResult] = useState<any>('');

  const signMessage = async () => {
    try {
      const result = await window.tronWeb.trx.signMessage(message);
      setResult(result);
    } catch (error: Error | string | any) {
      notification.error({
        message: error.message || error,
      });
    }
  };

  return (
    <Wrapper name="signMessage">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ message }}
        onValuesChange={({ message }) => setMessage(message)}
        autoComplete="off"
      >
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
        <Button onClick={signMessage}>Sign Message</Button>
      </Form.Item>

      <Typography.Paragraph>{result}</Typography.Paragraph>
    </Wrapper>
  );
}
