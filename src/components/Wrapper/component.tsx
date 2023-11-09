import { Row } from 'antd';

export default function Wrapper({ children }: { children?: React.ReactNode }) {
  return <Row gutter={16}>{children}</Row>;
}
