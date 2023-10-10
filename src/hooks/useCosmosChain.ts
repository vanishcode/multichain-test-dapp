import { useMount } from 'ahooks';
import { message } from 'antd';
import { useState } from 'react';

const CHAIN_ID = 'pacific-1'; // sei

export default function useCosmosChain() {
  const [signer, setSigner] = useState('');

  useMount(async () => {
    try {
      const { bech32Address } = await window.keplr?.getKey(CHAIN_ID);
      setSigner(bech32Address);
    } catch (error: Error | any) {
      message.error(error.message);
    }
  });

  return [CHAIN_ID, signer];
}
