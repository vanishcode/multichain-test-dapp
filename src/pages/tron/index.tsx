import { Row } from 'antd';

import SignMessage from './methods/SignMessage';
import SignTransaction from './methods/SignTransaction/index';
import SignTransactionUSDT from './methods/SignTransaction/usdt';

export default function Page() {
  return (
    <Row gutter={16}>
      <SignMessage />
      <SignTransaction />
      <SignTransactionUSDT />
    </Row>
  );
}
