import Wrapper from '@/components/Wrapper';
import { Alert, Button, notification, Space } from 'antd';
import { useState } from 'react';

export default function BlockNumber() {
  const [result, setResult] = useState<any>('');

  const handleClick = async () => {
    try {
      const result = await window.ethereum.request({
        method: 'eth_blockNumber',
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
    <Wrapper name="eth_blockNumber">
      <Button onClick={handleClick}>Block Number</Button>

      {result && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message={result} type="info" />
        </Space>
      )}
    </Wrapper>
  );
}
