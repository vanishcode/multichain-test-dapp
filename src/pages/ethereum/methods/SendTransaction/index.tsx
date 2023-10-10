import Wrapper from '@/components/Wrapper';
import { useMount } from 'ahooks';
import { Button } from 'antd';
import { useState } from 'react';

export default function SendTransaction() {
  const [address, setAddress] = useState<string>('');
  const [result, setResult] = useState<any>('');

  const handleClick = async () => {
    try {
      const params = [
        {
          from: address,
          to: address,
          value: '0x5af3107a4000',
          gasPrice: '0x6fc23ac00',
          gas: '0x5208',
        },
      ];
      const result = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params,
      });
      setResult(result);
    } catch (error: Error | any) {
      setResult(error.message);
    }
  };

  useMount(() => {
    const getAddress = async () => {
      try {
        const account = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAddress(account[0]);
      } catch (error: Error | any) {
        setResult(error.message);
      }
    };
    getAddress();
  });

  return (
    <Wrapper name="eth_sendTransaction">
      <h1>SendTransaction</h1>
      <Button onClick={handleClick}>Send Transaction</Button>
      <p>result: {result}</p>
    </Wrapper>
  );
}
