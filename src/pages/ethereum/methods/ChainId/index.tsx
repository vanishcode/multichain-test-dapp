import Wrapper from '@/components/Wrapper';
import { Alert, Button, notification, Space } from 'antd';
import { useState } from 'react';

export default function ChainId() {
  const [result, setResult] = useState<any>('');

  const handleClick = async () => {
    try {
      const result = await window.ethereum.request({
        method: 'eth_chainId',
        params: [],
      });
      setResult(result || 'ok');
    } catch (error: Error | string | any) {
      notification.error({
        message: error.message || error,
      });
    }
  };

  return (
    <Wrapper name="eth_chainId">
      <Button onClick={handleClick}>Chain Id</Button>

      <br />
      {result && (
        <Space
          direction="vertical"
          style={{ width: '100%', paddingTop: '16px' }}
        >
          <Alert message={result} type="info" />
        </Space>
      )}
    </Wrapper>
  );
}
