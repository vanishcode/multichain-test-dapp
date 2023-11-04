import { Row } from 'antd';

import { noWalletError } from '@/utils/errors';
import SignAmino from './methods/SignAmino';
import SignArbitrary from './methods/SignArbitrary';
import SignDirect from './methods/SignDirect';
import VerifyArbitrary from './methods/VerifyArbitrary';

export default function Cosmos() {
  if (!window.keplr) {
    noWalletError();
    return null;
  }

  window.keplr.defaultOptions = {
    sign: {
      preferNoSetFee: true,
      preferNoSetMemo: true,
    },
  };
  window.keplr.connect();

  return (
    <Row gutter={16}>
      <SignAmino />
      <SignArbitrary />
      <SignDirect />
      <VerifyArbitrary />
      {/* <SendTx /> */}
    </Row>
  );
}
