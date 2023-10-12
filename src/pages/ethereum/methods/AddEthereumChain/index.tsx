import Wrapper from '@/components/Wrapper';
import { Alert, Button, Form, Input, notification, Space } from 'antd';
import { useState } from 'react';

export default function AddEthereumChain() {
  const [chainInfo, setChainInfo] = useState<any>({
    chainId: '0xa869',
    chainName: 'Avalanche Fuji Testnet',
    nativeCurrency: {
      name: 'AVAX Token',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/avalanche_fuji'],
    blockExplorerUrls: ['https://testnet.snowtrace.io'],
  });
  const [result, setResult] = useState<any>('');

  const handleClick = async () => {
    try {
      const result = await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [chainInfo],
      });
      setResult(result || 'ok');
    } catch (error: Error | string | any) {
      notification.error({
        message: error.message || error,
      });
    }
  };

  return (
    <Wrapper name="wallet_addEthereumChain">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          chainId: chainInfo.chainId,
          chainName: chainInfo.chainName,
          name: chainInfo.nativeCurrency.name,
          symbol: chainInfo.nativeCurrency.symbol,
          decimals: chainInfo.nativeCurrency.decimals,
          rpcUrls: chainInfo.rpcUrls[0],
          blockExplorerUrls: chainInfo.blockExplorerUrls[0],
        }}
        onValuesChange={(values) => {
          setChainInfo({
            chainId: values.chainId,
            chainName: values.chainName,
            nativeCurrency: {
              name: values.name,
              symbol: values.symbol,
              decimals: values.decimals,
            },
            rpcUrls: [values.rpcUrls],
            blockExplorerUrls: [values.blockExplorerUrls],
          });
        }}
        autoComplete="off"
      >
        <Form.Item label="chainId" name="chainId">
          <Input />
        </Form.Item>

        <Form.Item label="chainName" name="chainName">
          <Input />
        </Form.Item>

        <Form.Item label="name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="symbol" name="symbol">
          <Input />
        </Form.Item>

        <Form.Item label="decimals" name="decimals">
          <Input />
        </Form.Item>

        <Form.Item label="rpcUrls" name="rpcUrls">
          <Input />
        </Form.Item>

        <Form.Item label="blockExplorerUrls" name="blockExplorerUrls">
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
            Add Ethereum Chain
          </Button>
        </Form.Item>
      </Form>

      {result && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message={result} type="success" />
        </Space>
      )}
    </Wrapper>
  );
}
