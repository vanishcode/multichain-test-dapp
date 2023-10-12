import { Row } from 'antd';

import SignMessage from './methods/SignMessage';
import GetUSDTName from './methods/SignTransaction/get-usdt-name';
import SignTransaction from './methods/SignTransaction/index';
import SendUSDT from './methods/SignTransaction/send-usdt';

export default function Page() {
  return (
    <Row gutter={16}>
      <SignMessage />
      <SignTransaction />
      <SendUSDT />
      <GetUSDTName />
    </Row>
  );
}
