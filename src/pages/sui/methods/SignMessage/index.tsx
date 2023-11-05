import Wrapper from '@/components/Wrapper';
import { useWalletKit } from '@mysten/wallet-kit';
import { Alert, Button, notification, Space } from 'antd';
import { useState } from 'react';

export default function SignMessage() {
  const { signMessage } = useWalletKit();

  const [result, setResult] = useState<any>('');

  const handleClick = async () => {
    try {
      const result = await signMessage({ message: new Uint8Array(1) });
      console.log(result);
      setResult(JSON.stringify(result) || 'ok');
    } catch (error: Error | string | any) {
      notification.error({
        message: error.message || error,
      });
    }
  };

  return (
    <Wrapper name="SignMessage">
      <Button onClick={handleClick}>Sign Message</Button>

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
