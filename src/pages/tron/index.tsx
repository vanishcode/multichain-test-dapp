import { Row } from 'antd';

import SignMessage from './methods/SignMessage';
import SignTransaction from './methods/SignTransaction';

export default function Page() {
  return (
    <Row gutter={16}>
      <SignMessage />
      <SignTransaction />
    </Row>
  );
}
