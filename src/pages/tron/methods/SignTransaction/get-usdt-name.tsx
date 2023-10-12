import Wrapper from '@/components/Wrapper';
import { Button, Form, Input, notification, Typography } from 'antd';
import { useState } from 'react';

export default function SignTransactionUSDT() {
  const USDTContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
  const [contract, setContractAddress] = useState<string>(USDTContractAddress);

  const [result, setResult] = useState<any>('');
  const [txID, setTxID] = useState<string>('');

  const handleGetUSDTName = async () => {
    try {
      const hexUSDTContractAddress =
        window.tronWeb.address.toHex(USDTContractAddress);
      const hexFromAddress = window.tronWeb.defaultAddress.hex;

      const { transaction } =
        await window.tronWeb.transactionBuilder.triggerSmartContract(
          hexUSDTContractAddress,
          'name()',
          {
            feeLimit: 100000000,
          },
          [],
          hexFromAddress,
        );
      const signed = await window.tronWeb.trx.signTransaction(transaction);
      const result = await window.tronWeb.trx.sendRawTransaction(signed);
      setTxID(result.transaction.txID);
      setResult(JSON.stringify(result, null, 2));
    } catch (error: Error | string | any) {
      notification.error({
        message: error.message || error,
      });
    }
  };

  const handleGetContractExecuteResult = async () => {
    try {
      const returns = await window.tronWeb.trx.getTransaction(txID);
      setResult(JSON.stringify(returns, null, 2));
    } catch (error: Error | string | any) {
      notification.error({
        message: error.message || error,
      });
    }
  };

  return (
    <Wrapper name="signTransaction - Get USDT Name (About 2 Trxs Fee)">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ contract }}
        onValuesChange={(values) => {
          setContractAddress(values.contract);
        }}
        autoComplete="off"
      >
        <Form.Item label="contract" name="contract">
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
        <Button onClick={handleGetUSDTName}>Get USDT Name</Button>
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
        <Button onClick={handleGetContractExecuteResult} disabled={!txID}>
          Get Contract Execute Result
        </Button>
      </Form.Item>

      <Typography.Paragraph>{result}</Typography.Paragraph>
    </Wrapper>
  );
}
