import Wrapper from '@/components/Wrapper';
import { Button, Form, Input, notification, Typography } from 'antd';
import { useState } from 'react';

export default function Approve() {
  const [dAppAddress, setDAppAddress] = useState<string>(
    'TGvyvtbrJDwDxSYy9LDUJWtP8XFncj2Xd7',
  );
  const [contractAddress, setContractAddress] = useState<string>(
    'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
  );
  const [amount, setAmount] = useState<number>(666666);

  const [result, setResult] = useState<any>('');

  const handleClick = async () => {
    try {
      const hexContractAddress = window.tronWeb.address.toHex(contractAddress);
      const hexFromAddress = window.tronWeb.defaultAddress.hex;
      const hexDAppAddress = window.tronWeb.address.toHex(dAppAddress);

      const { transaction } =
        await window.tronWeb.transactionBuilder.triggerSmartContract(
          hexContractAddress,
          'approve(address,uint256)',
          {
            feeLimit: 100000000,
          },
          [
            { type: 'address', value: hexDAppAddress },
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
    <Wrapper name="signTransaction - TRC20 Approve">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ contractAddress, dAppAddress, amount }}
        onValuesChange={(values) => {
          setContractAddress(values.contractAddress);
          setDAppAddress(values.dAppAddress);
          setAmount(values.amount);
        }}
        autoComplete="off"
      >
        <Form.Item label="contractAddress" name="contractAddress">
          <Input />
        </Form.Item>

        <Form.Item label="dAppAddress" name="dAppAddress">
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
        <Button onClick={handleClick}>Approve</Button>
      </Form.Item>

      <Typography.Paragraph>{result}</Typography.Paragraph>
    </Wrapper>
  );
}