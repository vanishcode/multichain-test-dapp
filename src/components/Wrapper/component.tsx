import { Card, Col } from 'antd';

export default function Wrapper({
  children,
  name,
}: {
  children?: React.ReactNode;
  name: string;
}) {
  return (
    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
      <Card title={name} style={{ margin: '16px 0' }}>
        {children}
      </Card>
    </Col>
  );
}
