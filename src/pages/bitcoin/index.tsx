import { Row } from 'antd';
import SignMessage from './methods/SignMessage';

export default function Page() {
  return (
    <Row gutter={16}>
      <SignMessage />
    </Row>
  );
}
