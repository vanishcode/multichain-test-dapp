import Item from '@/components/Item';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';

export default function SendTx() {
  const handleClick = async () => {
    if (!window.signDirectResult) {
      alert('need run signDirect first');
      return;
    }
    const tx = TxRaw.encode({
      bodyBytes: window.signDirectResult.signed.bodyBytes,
      authInfoBytes: window.signDirectResult.signed.authInfoBytes,
      signatures: [
        Buffer.from(window.signDirectResult.signature.signature, 'base64'),
      ],
    }).finish();

    const result = await window.keplr.sendTx(
      window.signDirectResult.signed.chainId,
      tx,
      'async',
    );
    return result;
  };

  return (
    <Item name="sendTx(need run signDirect first)" onClick={handleClick} />
  );
}
