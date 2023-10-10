import { Button } from 'antd';
import { useState } from 'react';

import useCosmosChain from '@/hooks/useCosmosChain';

export default function SignArbitrary() {
  const [chainId, signer] = useCosmosChain();
  const [message, setMessage] = useState('Hello World');
  const [result, setResult] = useState<any>('');

  const handleClick = async () => {
    try {
      const signature = await window.keplr.signArbitrary(
        chainId,
        signer,
        message,
      );
      setResult(JSON.stringify(signature));
    } catch (error: Error | any) {
      setResult(error.message);
    }
  };

  return (
    <div>
      <h1>SignArbitrary</h1>
      <input
        type="text"
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <Button onClick={handleClick}>Sign Arbitrary</Button>
      <p>result: {result}</p>
    </div>
  );
}
