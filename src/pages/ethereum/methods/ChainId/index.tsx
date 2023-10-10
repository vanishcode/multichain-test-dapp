import Wrapper from '@/components/Wrapper';
import { Button, notification, Typography } from 'antd';
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
      <Typography.Paragraph>{result}</Typography.Paragraph>
    </Wrapper>
  );
}
