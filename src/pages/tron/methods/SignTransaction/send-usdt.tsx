import Wrapper from '@/components/Wrapper';
import { Button, Form, Input, notification, Typography } from 'antd';
import { useState } from 'react';

export default function SignTransactionUSDT() {
  const fromAddress = window.tronWeb.defaultAddress.base58;
  const toAddress = 'TGvyvtbrJDwDxSYy9LDUJWtP8XFncj2Xd7';

  const USDTContractAddress = window.tronWeb.address.toHex(
    'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
  );

  const [to, setTo] = useState<string>(toAddress);
  const [owner, setOwner] = useState<string>(fromAddress);
  const [amount, setAmount] = useState<number>(100);
  const [feeLimit, setFeeLimit] = useState<number>(100000000);

  const [result, setResult] = useState<any>('');

  const handleClick = async () => {
    try {
      const hexUSDTContractAddress =
        window.tronWeb.address.toHex(USDTContractAddress);
      const hexToAddress = window.tronWeb.address.toHex(
        'TGvyvtbrJDwDxSYy9LDUJWtP8XFncj2Xd7',
      );
      const hexFromAddress = window.tronWeb.defaultAddress.hex;
      const { transaction } =
        await window.tronWeb.transactionBuilder.triggerSmartContract(
          hexUSDTContractAddress,
          'transfer(address,uint256)',
          {
            feeLimit,
          },
          [
            {
              type: 'address',
              value: hexToAddress,
            },
            { type: 'uint256', value: amount },
          ],
          hexFromAddress,
        );
      const signed = await window.tronWeb.trx.signTransaction(transaction);
      const result = await window.tronWeb.trx.sendRawTransaction(signed);
      setResult(JSON.stringify(result, null, 2));
    } catch (error: Error | string | any) {
      notification.error({
        message: error.message || error,
      });
    }
  };

  return (
    <Wrapper name="signTransaction - Send USDT">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ to, amount, owner, feeLimit }}
        onValuesChange={({ to, amount, owner, feeLimit }) => {
          if (to) {
            setTo(to);
          }
          if (amount) {
            setAmount(amount);
          }
          if (owner) {
            setOwner(owner);
          }
          if (feeLimit) {
            setFeeLimit(feeLimit);
          }
        }}
        autoComplete="off"
      >
        <Form.Item label="to" name="to">
          <Input />
        </Form.Item>

        <Form.Item label="amount" name="amount">
          <Input />
        </Form.Item>

        <Form.Item label="feeLimit" name="feeLimit">
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
        <Button onClick={handleClick}>Send USDT</Button>
      </Form.Item>

      <Typography.Paragraph>{result}</Typography.Paragraph>
    </Wrapper>
  );
}
