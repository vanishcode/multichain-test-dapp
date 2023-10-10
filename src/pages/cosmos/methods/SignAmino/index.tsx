import useCosmosChain from '@/hooks/useCosmosChain';
import { Button } from 'antd';
import { useState } from 'react';

export default function SignAmino() {
  const [chainId, signer] = useCosmosChain();
  const [message, setMessage] = useState('Hello World');
  const [result, setResult] = useState<any>('');

  const handleClick = async () => {
    try {
      const signature = await window.keplr.signAmino(
        chainId,
        signer,
        {
          account_number: '833360',
          chain_id: chainId,
          fee: {
            gas: '174651',
            amount: [
              {
                amount: '43',
                denom: 'uatom',
              },
            ],
          },
          memo: '',
          msgs: [
            {
              type: 'sign/MsgSignData',
              value: {
                signer,
                data: btoa(message),
              },
            },
          ],
          sequence: '20',
        },
        { preferNoSetFee: true },
      );
      setResult(JSON.stringify(signature));
    } catch (error: Error | any) {
      setResult(error.message);
    }
  };

  return (
    <div>
      <h1>SignAmino</h1>
      <input
        type="text"
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <Button onClick={handleClick}>Sign Amino</Button>
      <p>result: {result}</p>
    </div>
  );
}
