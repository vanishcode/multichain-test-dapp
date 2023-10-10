import Wrapper from '@/components/Wrapper';
import { Button, Form, Input, notification, Typography } from 'antd';
import { useState } from 'react';

export default function SignTransaction() {
  const address = window.tronWeb.defaultAddress.base58;

  const [to, setTo] = useState<string>('TGvyvtbrJDwDxSYy9LDUJWtP8XFncj2Xd7');
  const [amount, setAmount] = useState<number>(10000);
  const [owner, setOwner] = useState<string>(address);

  const [result, setResult] = useState<any>('');

  const handleClick = async () => {
    try {
      const transaction = await window.tronWeb.transactionBuilder.sendTrx(
        to,
        amount,
        owner,
      );
      const result = await window.tronWeb.trx.signTransaction(transaction);
      setResult(JSON.stringify(result, null, 2));
    } catch (error: Error | string | any) {
      notification.error({
        message: error.message || error,
      });
    }
  };

  return (
    <Wrapper name="signTransaction">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ to, amount, owner }}
        onValuesChange={(values) => {
          setTo(values.to);
          setAmount(values.amount);
          setOwner(values.owner);
        }}
        autoComplete="off"
      >
        <Form.Item label="to" name="to">
          <Input />
        </Form.Item>

        <Form.Item label="amount" name="amount">
          <Input />
        </Form.Item>

        <Form.Item label="owner" name="owner">
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
        <Button onClick={handleClick}>Sign Transaction</Button>
      </Form.Item>

      <Typography.Paragraph>{result}</Typography.Paragraph>
    </Wrapper>
  );
}
