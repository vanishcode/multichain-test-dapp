import { Row } from 'antd';

import SignAmino from './methods/SignAmino';
import SignArbitrary from './methods/SignArbitrary';
import SignDirect from './methods/SignDirect';
import VerifyArbitrary from './methods/VerifyArbitrary';
// import SendTx from './methods/SendTx';

export default function Cosmos() {
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
