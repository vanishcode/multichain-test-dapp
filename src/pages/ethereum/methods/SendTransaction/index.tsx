import { useMount } from 'ahooks';
import { useState } from 'react';

import Item from '@/components/Item';
import { ethereumConnect } from '@/utils/connect';

export default function SendTransaction() {
  const [signParams, setSignParams] = useState({
    chainId: '0x1',
    from: '',
    to: '',
    value: '0x5af3107a4000',
    gasPrice: '0x6fc23ac00',
    gas: '0x5208',
    data: '',
  });

  useMount(() => {
    async function init() {
      const accounts = await ethereumConnect();
      if (!accounts) {
        return;
      }

      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
        params: [],
      });

      const updated = {
        chainId,
        from: accounts[0],
        to: accounts[0],
      };
      setSignParams({
        ...signParams,
        ...updated,
      });
    }

    init();
  });

  const handleClick = async (values: any) => {
    const result = await window.ethereum?.request({
      method: 'eth_sendTransaction',
      params: [values],
    });
    return result;
  };

  return (
    <Item name="eth_sendTransaction" value={signParams} onClick={handleClick} />
  );
}
